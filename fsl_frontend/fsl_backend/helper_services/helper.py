import os
import shutil
from itsdangerous import URLSafeTimedSerializer as Serializer
from flask import current_app as app


def empty_folder(path: str):
    for filename in os.listdir(path):
        file_path = os.path.join(path, filename)
        try:
            if os.path.isfile(file_path) or os.path.islink(file_path):
                os.unlink(file_path)
            elif os.path.isdir(file_path):
                shutil.rmtree(file_path)
        except Exception as e:
            print('Failed to delete %s. Reason: %s' % (file_path, e))


def generate_token(dict: dict):
    s = Serializer(app.config.get("FLASK_AUTHSECRET"))
    tok = s.dumps(dict)
    return tok


def verify_token(token, dic: dict, expireSeconds: int = 3000):
    s = Serializer(app.config.get("FLASK_AUTHSECRET"))
    try:
        d = s.loads(token, expireSeconds)
        if (dic == d):
            return True
        else:
            return False
    except Exception as error:
        print(error)
        return None
