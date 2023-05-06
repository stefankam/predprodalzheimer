# IMPORTS
import flask
from flask import (
    Blueprint, jsonify)
import json
import hashlib
from itsdangerous import URLSafeTimedSerializer as Serializer
from flask_mail import Mail, Message
import json
from flask import current_app as app
from flask_cors import CORS, cross_origin
from fsl_frontend.fsl_backend.database_services import db_user
from fsl_frontend.fsl_backend.database_services.db_user import get_user_by_name
from fsl_frontend.fsl_backend.helper_services import helper

# from sessions.sessionstorage import SessionStorage
# Goolge
# Client-id: 121303468068-fv54rabrchn22a44oufh0fi43t6an7s8.apps.googleusercontent.com
# Client-key: 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

# creating blueprint for later reuse (being pointed on by main.py)
bp_auth = Blueprint('authentication', __name__)


# method : authentification user
# returns : token
# parameters : verified token
# description: posted login data is retrieved and sent to the Payload helper service,
# login creadentials are checked and corresponding response given.
@bp_auth.route("/login", methods=["POST"])
def auth():
    # print(app.config["DEBUG"])
    try:
        req = flask.request.get_json(force=True)
        client_id = req.get("client_id")
        client_secret_input = req.get("client_secret")
        if not client_id or not client_secret_input:
            return {'Empty_credentials': True}
        hash_object = hashlib.sha1(bytes(client_secret_input, 'utf-8'))
        hashed_client_secret = hash_object.hexdigest()
        authentication_check = db_user.authenticate(client_id, hashed_client_secret)
        token = helper.generate_token(authentication_check)
        if authentication_check is False:
            return {'Authentication': False}
        else:
            try:
                verification = helper.verify_token(token, authentication_check)
                if verification is False:
                    return {'Blacklisted': True}
                if verification is None:
                    return {'Token': False}
                else:
                    resp = {"use_name": authentication_check["use_name"],
                            "use_admin": authentication_check["use_admin"],
                            "token": token}
                    return json.dumps(resp)
            except Exception:
                print("Something else went wrong")
    except Exception:
        print("Something else went wrong")



# method :
# returns :
# parameters :
# description:
@bp_auth.route("/logout", methods=["POST"])
def logout():
    req = flask.request.get_json(force=True)
    token = req.form.get("token")
    status = db_user.blacklist(token)
    return {'success': status}

# def setSession(boolean : true):
#   sessionStorage.setItem(key, value)
