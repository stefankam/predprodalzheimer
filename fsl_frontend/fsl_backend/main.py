import os
import command
import flask
from flask import Flask, render_template
from flask_cors import CORS
from flask_restful import Resource, Api, reqparse
from dotenv import load_dotenv
from flask_mail import Mail, Message

from fsl_frontend.fsl_backend import settings
from fsl_frontend.fsl_backend.api_services.api_files import bp_files
from fsl_frontend.fsl_backend.helper_services.fsl_interface import launch_bet, get_TR, melodic, dual_regression, launch_SliceTimer, launch_mcflirt, launch_spatial_smoothing
#from fsl_frontend.fsl_backend.fsl_interface.fsl_eyes import plot_slice
from fsl_frontend.fsl_backend.api_services.api_auth import bp_auth
from fsl_frontend.fsl_backend.api_services.api_user import bp_user
from fsl_frontend.fsl_backend.api_services.api_files import bp_files

from fsl_frontend.fsl_backend.database_services.cnx_db import open_db
load_dotenv('.env')


def create_app(config=None):
    # create and configure the app / app = Flask(__name__, instance_relative_config=True)
    app = Flask(__name__)
    CORS(app)
    app.mail = None
    #importing blueprints
    app.register_blueprint(bp_auth)
    app.register_blueprint(bp_user)
    app.register_blueprint(bp_files)

    # app.config['CORS_HEADERS'] = '*'
    if config == 0:
        app.config.from_object(settings.ProductionConfig())
    elif config == 1:
        app.config.from_object(settings.TestingConfig())
        app.debug = True
    else:
        app.config.from_object(settings.DevelopmentConfig())
        app.mail = Mail(app)
        app.useReloader = False

    try:  # ensure the instance folder exists
        os.makedirs(app.instance_path)
    except OSError:
        pass

    return app