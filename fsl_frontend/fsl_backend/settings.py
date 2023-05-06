# from os import environ
#
# EXPIRESSECONDS = environ.get('EXPIRESSECONDS')
# DBNAME = environ.get('DBNAME')
# DBUSER = environ.get('DBUSER')
# DBPASS = environ.get('DBPASS')

#
from os import environ, path
from dotenv import load_dotenv

basedir = path.abspath(path.dirname(__file__))
load_dotenv(path.join(basedir, ".env"))


# load_dotenv(path.join(basedir, ".test_env"))

class Config(object):
    TESTING = False


class ProductionConfig(Config):
    DATABASE_URI = 'mysql://user@localhost/foo'


class DevelopmentConfig(Config):
    FLASK_AUTHSECRET = environ.get("AUTHSECRET")
    EXPIRESSECONDS = environ.get("EXPIRESSECONDS")
    DBNAME = environ.get("DBNAME")
    DBUSER = environ.get("DBUSER")
    DBPASS = environ.get("DBPASS")
    DBHOST = "localhost"
    FILESERVER_PATH = environ.get('FILESERVER_PATH')
    MAIL_SERVER = "smtp-mail.outlook.com"
    MAIL_PORT = 587
    MAIL_USERNAME = "jennifer.schlappinger@outlook.com"#environ.get("EMAIL_USER")
    MAIL_PASSWORD = "4meonlyJesus" #environ.get("EMAIL_PASSWORD")
    MAIL_USE_TLS = True
    MAIL_USE_SSL = False
    # mail_config = {
    #     "MAIL_SERVER" : "smtp.office356.com",
    #     "MAIL_PORT" : 587,
    #     "MAIL_USERNAME" : environ.get("EMAIL_USER"),
    #     "MAIL_PASSWORD" : environ.get("EMAIL_PASSWORD")
    # }

    ALLOWED_EXTENSIONS = environ.get("ALLOWED_EXTENSIONS")


class TestingConfig(Config):
    DATABASE_URI = 'sqlite:///:memory:'
    TESTING = True
