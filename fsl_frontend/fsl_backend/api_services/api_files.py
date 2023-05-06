import json
import os
from io import BytesIO

from flask import (Blueprint, request, send_from_directory, send_file)
from werkzeug.utils import secure_filename
from flask import current_app as app
import shutil

from fsl_frontend.fsl_backend.database_services.db_process import add_process, get_all_processes, delete_process_by_id, \
    get_zip_by_id, get_processname
from fsl_frontend.fsl_backend.database_services.db_user import get_userId_by_name
from fsl_frontend.fsl_backend.helper_services import helper
from fsl_frontend.fsl_backend.helper_services.fsl_interface import get_TR, melodic, dual_regression, launch_bet
from fsl_frontend.fsl_backend.helper_services.octave_interface import add_octave

# Blueprints
bp_files = Blueprint('file-manager', __name__)

# TODO change these variables after your serverlocation
# Personalised file
PERSONAL_FOLDER = ""
# Location for preprocessing
UP_FO_PRE = '/home/jen/X_PREPROCESS'
# Location for matrices
UP_FO_MAT = '/home/jen/X_MATRICES'
# Location for data
UP_FO_DATA = '/home/jen/X_DATA'

FSL_MASKS = {0: UP_FO_DATA + "/MNI152_T1_2mm_brain_mask.nii.gz",
             1: UP_FO_DATA + "/MNI152_T1_1mm_brain_mask.nii.gz"}


@bp_files.route("/preprocess", methods=["POST"])
def start_bet():
    # First collect all the sent parameters
    test = "test"
    try:
        # 1: Process name
        new_process_name = request.form.get("processName")

        # 2: File
        if 'file' not in request.files:
            return {"File": False}
        file = request.files.get('file', False)
        filename = secure_filename(file.filename)
        if file.filename == '':
            return {"Empty": True}

        if allowed_file(filename) is True:
            os.system("mkdir '{0}'/'{1}'".format(UP_FO_PRE, new_process_name))
            new_filepath = UP_FO_PRE + "/" + new_process_name
            filepath = os.path.join(new_filepath, filename)
            file.save(filepath)
        else:
            return {"Wrong input": filename.rsplit('.', 1)[1].lower()}

        # 3 : Bet parameters
        if request.form.get("bet") != "false":
            bet_params: dict = json.loads(request.form.get("bet"))
            print(bet_params)
            # launch_bet(filepath, **bet_params)
        # 4 : Mcflirt parameters
        if request.form.get("mcflirt") != "false":
            print("arrrg")
        # 5 : Mcflirt parameters
        if request.form.get("slitime") != "false":
            print("Slicetime parameters: ", request.form.get("slitime"))
        # 6 : Mcflirt parameters
        if request.form.get("spatsmo") != "false":
            print(request.form.get("spatsmo"))

            # current_file = launch_mcflirt(filepath)
            # current_file = launch_SliceTimer(current_file)
            # current_file = launch_spatial_smoothing(current_file)
            # new_filename = os.path.basename(os.path.normpath(bet_file))
        insert_id: int = 2
        return {"Success": insert_id}, 200
    except Exception as e:
        return {"Error": e}


@bp_files.route("/brainMatrix", methods=["POST"])
def generate_matrix():
    try:
        # 1: Process name
        new_process_name = request.form.get("processName")

        # 2: File
        f = request.files.get('fMRIFile')
        fname = secure_filename(f.filename)

        if allowed_file(fname) is True:
            os.system("mkdir '{0}'/'{1}'".format(UP_FO_MAT, new_process_name))
            new_filepath = UP_FO_MAT + "/" + new_process_name
            filepath = os.path.join(new_filepath, fname)
            # f.save(filepath)
        else:
            return {"Wrong input": f.rsplit('.', 1)[1].lower()}

        # try:
        #     # 3: tr, nbNodes, mask, bet
        #     tr = float(request.form.get("TR"))
        #     nbNodes = int(request.form.get("nbNodes", 116))
        #     mask = request.form.get("mask", FSL_MASKS[0])
        #     if mask == "1" :
        #         mask = FSL_MASKS[0]
        #     elif mask == "2":
        #         mask = FSL_MASKS[1]
        #     elif mask == "0":
        #         mask = None
        #     bet = parseBool(request.form.get("bet", None))
        #     n = {"tr": tr, "nbNodes": nbNodes, "mask": mask, "bet": bet}
        #     melodicParams = {}
        #     for m in n:
        #         if (n[m]) is not None:
        #             melodicParams[m] = n[m]
        #     melodic(filepath, new_filepath, **melodicParams)
        #     ic_filepath = os.path.join(new_filepath, "melodic_IC.nii.gz")
        # except Exception as e:
        #     print(e)
        #     return {"Error": e}
        # try:
        #     #4 : normalisation, group_mean, nb of permutations
        #     norm = parseBool(request.form.get("norm", "true"))
        #     perm = int(request.form.get("nbPerm", 0))
        #     n = {"des_norm": norm, "n_perm": perm}
        #     dualParams = {}
        #     for dp in n:
        #         if (n[dp]) is not None:
        #             dualParams[dp] = n[dp]
        #     dualParams["out_dir"] = str(new_filepath + "/" + "melodic_IC.dr")
        #     dual_regression(filepath, ic_filepath, **dualParams)
        #     dr_filepath = os.path.join(new_filepath, "melodic_IC.dr")
        # except Exception as e:
        #     print(e)
        #     return {"Error": e}
        # try:
        #     # 3: tr, nbNodes, mask, bet
        #     nbNodes = int(request.form.get("nbNodes", 116))
        #     normal = request.form.get("normal", True)
        #     corr = request.form.get("corr", "corr")
        #     matrixTitle = request.form.get("matrixName", "Brain connectivity matrix")
        #     add_octave(dr_filepath, tr, normal, corr, "jet", matrixTitle, new_filepath)
        # except Exception as e:
        #     print(e)
        #     return {"Error": e}
        #zipFile = new_filepath + "/" + new_process_name + ".zip"
        zipFile = "/home/jen/X_MATRICES/JensProcess.zip"
        print(zipFile)
        #shutil.make_archive(new_filepath, 'zip', new_filepath)
        #shutil.rmtree(new_filepath, ignore_errors=True)

        # Save the generated files
        #loggedUser = request.form.get("username")
        #userId = get_userId_by_name(loggedUser)
        try:
            with open(zipFile, 'rb') as zip_archive:
                #add_process(new_process_name, userId, zipFile)
                add_process("TestProcess", 7, zipFile)
                return {"Success": "Your matrix was generated"}, 200
        except Exception as e:
            print(e)
            return {"Failed": e}, 200
    except Exception as e:
        print(e)
        return {"Error": e}


@bp_files.route("/get_tr", methods=["POST"])
def get_tr():
    try:
        f = request.files.get('fMRIFile')
        up_fo = '/home/jen/Documents/0_Input_ICA'
        fname = secure_filename(f.filename)
        fpath = os.path.join(up_fo, fname)
        f.save(fpath)
        tr = get_TR(fpath)
        return {"TR": str(tr)}, 200
    except Exception:
        print("Something else went wrong")
        return {"Error": True}


@bp_files.route("/checkProcessName", methods=["GET"])
def check_processname():
    try:
        processname = request.args.to_dict().get("processName","")
        username = request.args.to_dict().get("user")
        userId = get_userId_by_name(username)
        name_exists = get_processname(userId, processname)
        if name_exists :
            res = False
        else:
            res = True
        return {"res": res}, 200
    except Exception:
        print("Something else went wrong")
        return {"Error": True}


@bp_files.route("/melodic_group", methods=["POST"])
def start_melodic_group():
    try:
        files = request.files.getlist("fileList")
        up_fo = '/home/jen/Documents/0_Input_ICA'
        if files:
            helper.empty_folder(up_fo)
            text_file = open("%s/ICA_List.txt" % up_fo, "w")
            filestring = ""
            for f in files:
                filename = secure_filename(f.filename)
                filepath = os.path.join(up_fo, filename)
                f.save(filepath)
                next_file_string = up_fo + "/" + filename + "\n"
                filestring += next_file_string
            text_file.write(filestring)
            current_file = melodic(text_file)
            current_file.save(up_fo)
        return {"Success": True}, 200
    except Exception:
        print("Something else went wrong")
        return {"Error": True}


@bp_files.route("/downloadFile", methods=["GET"])
def download_process():
    try:
        processName = request.args.to_dict().get("processName")
        loggedUser = request.args.to_dict().get("user")
        userId = get_userId_by_name(loggedUser)
        return send_from_directory(UP_FO_MAT, str(processName+".zip"))
        # return send_file(BytesIO(file), "Tester.zip")
    except Exception as e:
        print(e)
        return {"Success": False}, 405


@bp_files.route("/loadResults", methods=["POST"])
def load_files():
    loggedUser = request.form.get("loggedUser")
    userId = get_userId_by_name(loggedUser)
    processes = get_all_processes(userId)
    try:
        return {"Success": processes}, 200
    except Exception as e:
        print(e)
        return {"Success": False}, 200


@bp_files.route("/deleteProcess", methods=["DELETE"])
def delete_process():
    try:
        process_id = request.args.to_dict().get("processId")
        resp = delete_process_by_id(process_id)
        return {"Success": resp}, 200
    except Exception as e:
        print(e)
        return {"Success": False}, 403

def allowed_file(filename):
    return '.' in filename and filename.rsplit('.', 1)[1].lower() in app.config["ALLOWED_EXTENSIONS"]


def parseBool(v):
    return str(v).lower() in ("yes", "true", "t", "1")
