import os
import platform
import nipype.interfaces.fsl as fsl
from nipype.interfaces.fsl import MELODIC
from nipype.interfaces.fsl.model import DualRegression

import numpy as np
import nibabel as nb
import subprocess
import tempfile
import os


# 1. Brain extraction
def launch_bet(input_file, **kwargs):
    myb = fsl.BET()
    # set FSL path (creating file if necessary? -->os.system("cd /home/jen && . ~/.bashrc") #~/.bash_profile & .profile
    ################# MANDATORY PARAMETERS ###################
    myb.inputs.in_file = input_file
    myb.inputs.out_file = set_extraced_brain_name(input_file, "_brain")
    ################# OPTIONAL PARAMETERS WITH DEFAULT ###################
    myb.inputs.frac = kwargs.get("frac", 0.5)
    myb.inputs.vertical_gradient = kwargs.get("vertical", 0)
    ################# OPTIONAL PARAMETERS WITHOUT DEFAULT ###############
    if kwargs.get("outline"): myb.inputs.outline = kwargs.get("outline")
    if kwargs.get("mask"): myb.inputs.mask = kwargs.get("mask")
    if kwargs.get("no"): myb.inputs.no_output = kwargs.get("no")
    if kwargs.get("radius"): myb.inputs.radius = kwargs.get("radius")
    if kwargs.get("center"): myb.inputs.center = kwargs.get("center")
    if kwargs.get("thresh"): myb.inputs.threshold = kwargs.get("thresh")
    if kwargs.get("mesh"): myb.inputs.mesh = kwargs.get("mesh")
    if kwargs.get("skull"): myb.inputs.skull = kwargs.get("skull")

    match kwargs.get("vars"):
        case "robust":
            myb.inputs.robust = True
        case "remove_eyes":
            myb.inputs.remove_eyes = True
        case "reduce_bias":
            myb.inputs.reduce_bias = True
        case "padding":
            myb.inputs.padding = True
        case "surfaces":
            myb.inputs.surfaces = True
    if kwargs.get("t2_guided"):
        try:
            myb.inputs.t2_guided = kwargs.get("t2_guided")
        except Exception as e:
            print(e)
            return None
    try:
        myb.run()
    except Exception as e:
        print(e)
        return None


# 2. Motion correction
def launch_mcflirt(input_file):
    mcflt = fsl.MCFLIRT()
    mcflt.inputs.in_file = input_file
    mcflt.inputs.out_file = set_extraced_brain_name(input_file, "_motion_correction")
    mcflt_res = mcflt.run()
    # output['motion_parameters'] = mcflt_res.outputs.par_file
    # output['motion_matrices'] = mcflt_res.outputs.mat_file
    # output['func'] = mcflt_res.outputs.out_file
    return mcflt_res.outputs.out_file


# 3.Slice timing correction
def launch_SliceTimer(input_file):
    st = fsl.SliceTimer()
    st.inputs.in_file = input_file
    st.inputs.out_file = set_extraced_brain_name(input_file, "_maco")
    st_res = st.run()
    return st_res.outputs.out_file


# 4. Segmentation and bias correction
def launch_spatial_smoothing(input_file):
    fastr = fsl.FAST()
    fastr.inputs.in_files = input_file
    fastr.inputs.out_files = set_extraced_brain_name(input_file, "_fast")
    fastr_res = fastr.run()
    return fastr_res


# 4. Normalization

def set_extraced_brain_name(filename, add_on):
    head, tail = os.path.split(filename)
    split_name = tail.split(".")
    if split_name[1] == "nii" and split_name[2] == "gz":
        if platform.system() == "Linux" or platform.system() == "Darwin":
            new_filename = head + "/" + split_name[0] + add_on + "." + split_name[1] + "." + split_name[2]
            return new_filename
    else:
        return None


############ The following steps are needed to generate the brain matrix #######
def melodic(input_file, filepath, **kwargs):
    print("I started melodic")
    melodic_set = MELODIC()
    ################# MANDATORY PARAMETERS ###################
    melodic_set.inputs.in_files = input_file
    ################# OPTIONAL PARAMETERS WITH DEFAULT ###################
    try:
        melodic_set.out_file = set_extraced_brain_name(input_file, "_ica")
        melodic_set.out_dir = filepath
        melodic_set.inputs.out_dir = filepath
    except Exception as e:
        print(e)
        return {"Error": e}
    ################# OPTIONAL PARAMETERS WITHOUT DEFAULT ###############
    try:
        if kwargs.get("bet"): melodic_set.inputs.no_bet = kwargs.get("bet")
        if kwargs.get("mask"): melodic_set.inputs.mask = kwargs.get("mask")
        if kwargs.get("tr"): melodic_set.inputs.tr_sec = kwargs.get("tr")
        if kwargs.get("nbNodes"): melodic_set.inputs.dim = kwargs.get("nbNodes")
    except Exception as e:
        print(e)
        return {"Error": e}
    melodic_set.run()
    # return melodic_output


# 2) Extract timeseries from nodes
def dual_regression_multiple(input_files: list, fourd_map, nb_permutations: int = 0):
    print("I started dual")
    dual_reg = DualRegression()
    dual_reg.inputs.in_files = input_files
    dual_reg.inputs.group_IC_maps_4D = fourd_map  # "allFA.nii"
    dual_reg.inputs.n_perm = nb_permutations  # default = 0 which means no randomise will be run
    dual_reg_result = dual_reg.run()
    return dual_reg_result


# 2) Extract timeseries from nodes
def dual_regression(input_file: str, melodic_maps: str, **kwargs):
    print("I started dual_regression")
    dual_reg = DualRegression()
    ################# MANDATORY PARAMETERS ###################
    dual_reg.inputs.in_files = input_file
    dual_reg.inputs.group_IC_maps_4D = melodic_maps
    dual_reg.inputs.n_perm = kwargs.get("nbPerm", 0)
    dual_reg.inputs.one_sample_group_mean = True
    ################# OPTIONAL PARAMETERS ###################
    try:
        if kwargs.get("out_dir"): dual_reg.inputs.out_dir = kwargs.get("out_dir")
        if kwargs.get("norm"): dual_reg.inputs.des_norm = kwargs.get("norm") # cmd first position : default True
        # if kwargs.get("mean"): dual_reg.inputs.one_sample_group_mean = kwargs.get("mean") # cmd second position : default True
         # cmd last position : default 0
    except Exception as e:
        print(e)
        return {"Error": e}
    print(dual_reg.cmdline)
    dual_reg.run()
    #return "Success"


def get_TR(func_input):
    np.set_printoptions(precision=4, suppress=True)
    img = nb.load(func_input)
    header = img.header
    return header.get_zooms()[-1]
