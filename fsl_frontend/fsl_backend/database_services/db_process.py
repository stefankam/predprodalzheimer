import os
import jwt

from . import cnx_db
# from dotenv import load_dotenv



# load_dotenv('.env')

def add_process(processName, userId, zipPath):
    query = "INSERT INTO public.process (\"pro_name\", \"pro_use_id\", \"pro_zip\") VALUES (%s,%s,%s)"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        c.execute(query, (processName, userId, zipPath))
        c.close()
        cnx_db.close_commit_db(c, cnx)
        return True
    else:
        return False


def get_all_processes(user_id):
    query = "SELECT * FROM public.process WHERE pro_use_id = %s"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        try:
            c.execute(query, (user_id,))
            rows = c.fetchall()
            process_name = False
            process_id = False
            processes = []
            if c.rowcount >= 1:
                print("I've got something")
                for r in rows:
                    process_id = r[0]
                    process_name = r[1]
                    processes.append({"process_id" : process_id,"process_name": process_name, "process_type":"Matrix"})
                return processes
            else:
                return 0
        finally:
            c.close()
            cnx_db.close_commit_db(c, cnx)
    else:
        raise Exception("The connection could not be established!")

def get_processname(user_id, process_name):
    query = "SELECT * FROM public.process WHERE pro_use_id = %s AND pro_name = %s"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        try:
            c.execute(query, (user_id,process_name))
            if c.rowcount >= 1:
                return True #if there is a row, then the username will not be unique
            else:
                return False
        finally:
            c.close()
            cnx_db.close_commit_db(c, cnx)
    else:
        raise Exception("The connection could not be established!")

def get_zip_by_id(process_id):
    query = "SELECT pro_zip FROM public.process WHERE pro_id = %s"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        try:
            c.execute(query, (process_id,))
            rows = c.fetchall()
            if c.rowcount >= 1:
                print("I've got a zip")
                for r in rows:
                    zip = r[0]
                    return zip
            else:
                return 0
        finally:
            c.close()
            cnx_db.close_commit_db(c, cnx)
    else:
        raise Exception("The connection could not be established!")

def delete_process_by_id(process_id):
    query = "DELETE FROM public.process WHERE pro_id = %s"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        c.execute(query, process_id)
        c.close()
        cnx_db.close_commit_db(c, cnx)
        return True
    else:
        return False

