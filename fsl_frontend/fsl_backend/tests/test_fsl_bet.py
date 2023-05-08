import numpy as np
import pytest
from nipype.interfaces import fsl

from fsl_frontend.fsl_backend.helper_services.fsl_interface import get_TR

@pytest.fixture
def set_vars():
    testfile = "/home/jen/X_DATA/fmri.nii.gz"
    kwargs_empty = {}
    smt = 9
    return testfile, kwargs_empty, smt

def test_files(set_vars):
    testfile = "/home/jen/X_DATA/structural.nii.gz"
    myb = fsl.BET()
    myb.inputs.in_file = "/home/jen/X_DATA/functional.nii.gz"
    print(myb.cmdline)
    assert myb.inputs.in_file == testfile, "Bet files do not match"+testfile+" - "+myb.inputs.in_file

def test_bet_tr(set_vars):
    expected = np.float32(4.2)
    actual = get_TR(set_vars[0])
    assert actual == expected, "TR wrong"

@pytest.mark.skip(reason="no way of currently testing this")
def test_cmd_default(set_vars):
    testfile = "/home/jen/X_DATA/structural.nii.gz"
    expected = f"bet {testfile} structural_brain.nii.gz -f 0.50 -g 0.00"
    myb = fsl.BET()
    # set FSL path (creating file if necessary? -->os.system("cd /home/jen && . ~/.bashrc") #~/.bash_profile & .profile
    ################# MANDATORY PARAMETERS ###################
    myb.inputs.in_file = testfile
    ################# OPTIONAL PARAMETERS WITH DEFAULT ###################
    myb.inputs.frac = set_vars[1].get("frac", 0.5)
    myb.inputs.vertical_gradient = set_vars[1].get("vertical", 0)
    ################# OPTIONAL PARAMETERS WITHOUT DEFAULT ###############
    if set_vars[1].get("outline"): myb.inputs.outline = set_vars[1].get("outline")
    if set_vars[1].get("mask"): myb.inputs.mask = set_vars[1].get("mask")
    if set_vars[1].get("no"): myb.inputs.no_output = set_vars[1].get("no")
    if set_vars[1].get("radius"): myb.inputs.radius = set_vars[1].get("radius")
    if set_vars[1].get("center"): myb.inputs.center = set_vars[1].get("center")
    if set_vars[1].get("thresh"): myb.inputs.threshold = set_vars[1].get("thresh")
    if set_vars[1].get("mesh"): myb.inputs.mesh = set_vars[1].get("mesh")
    if set_vars[1].get("skull"): myb.inputs.skull = set_vars[1].get("skull")

    match set_vars[1].get("vars"):
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
    if set_vars[1].get("t2_guided"):
        try:
            myb.inputs.t2_guided = set_vars[1].get("t2_guided")
        except Exception as e:
            print(e)
    assert myb.cmdline == expected, "Should be : "+ expected +", is :"+myb.cmdline

