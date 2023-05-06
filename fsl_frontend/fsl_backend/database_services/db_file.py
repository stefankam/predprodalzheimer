import os
from . import cnx_db
from dotenv import load_dotenv

load_dotenv('.env')


def add_file(filename, user_filepath):
    query = "INSERT INTO clients (\"file_name\", \"file_path\", \"file_content\") VALUES (%s,%s,%s)"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        c.execute(query, (filename, user_filepath))
        c.close()
        cnx_db.close_commit_db(c, cnx)
        return True
    else:
        return False


def delete_file(filename, filepath):
    query = "DELETE FROM files WHERE (\"file_name\", \"ClientSecret\", \"IsAdmin\") VALUES (%s,%s,%s)"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        c.execute(query, (filename, filepath))
        c.close()
        cnx_db.close_commit_db(c, cnx)
        return True
    else:
        return False


def view_file(filename, filepath):
    return None


def modify_file():
    return None
