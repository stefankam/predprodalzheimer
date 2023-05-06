import os

import flask
import jwt
from flask import (
    Blueprint, jsonify, request, url_for)
import hashlib
from flask_mail import Mail, Message

import json
from flask import current_app as app

from pip._internal import req

from fsl_frontend.fsl_backend.database_services import db_user
from fsl_frontend.fsl_backend.database_services.db_user import get_user_by_name, get_userId_by_name, get_userMail
from fsl_frontend.fsl_backend.helper_services import helper

bp_user = Blueprint('user-manager', __name__)

FSL_FILESERVER = "/home/jen/FSL"


@bp_user.route("/register", methods=["POST"])
def add_user():
    # get the user input
    req = flask.request.get_json(force=True)
    user_name = req.get("user_name")
    user_password = req.get("user_password")
    user_mail = req.get("user_mail")

    # the user's password in the database_services is "hashed" with a one-way hash
    hash_object = hashlib.sha1(bytes(user_password, 'utf-8'))
    hashed_user_password = hash_object.hexdigest()

    response = db_user.add_client(user_name, hashed_user_password, user_mail)
    newId = get_userId_by_name(user_name)
    print(newId)
    os.system("mkdir '{0}'/'{1}'".format(FSL_FILESERVER, newId))
    return {'success': response}


@bp_user.route("/delete", methods=["POST", "DELETE"])
def delete_user():
    # not yet implemented
    return {'success': True}


@bp_user.route("/user_exists", methods=["GET"])
def user_exists():
    user_name = request.args.get("username", False)
    resp = get_user_by_name(user_name)
    print(resp)
    return {"user": resp}, 200


@bp_user.route("/mail_exists", methods=["GET"])
def mail_exists():
    user_mail = request.args.get("mail", False)
    resp = get_userMail(user_mail)
    return {"user": resp}, 200


@bp_user.route("/askPassword")
def ask_newPassword():
    # jennifer.schlappinger@outlook.com
    recp = request.args.get("mail", False)
    reset_token = helper.generate_token({"user_mail": recp})
    try:
        msg = Message('FSL Web - Password Reset Request',
                      sender=app.config.get("MAIL_USERNAME"),
                      recipients=[recp],
                      html=f"<h1>You requested a new password.</h1>Please click on the following link to reset : <a href=\'http://localhost:3000/resetPassword/{reset_token}\'>fsl.jen/resetPassword</a>")
        app.mail.send(msg)
        return {'Res_Tok': reset_token},200
    except Exception as e:
        print(e)
        return {'Res_Tok': False},403

@bp_user.route("/checkResetToken")
def check_reset_token():
    reset_token = request.args.get("reset_token", False)
    recp = request.args.get("mail", False)
    if helper.verify_token(reset_token, {"user_mail": recp}, 300):
        return {"Token": True}
    else:
        return {"Token": False}

@bp_user.route("/resetPassword", methods=["PUT"])
def set_newPassword():
    return {"Success" : True}