import os
import jwt

from . import cnx_db
# from dotenv import load_dotenv
# from ..settings import EXPIRESSECONDS, AUTHSECRET
EXPIRESSECONDS = 3000
AUTHSECRET = "topsecret"


# load_dotenv('.env')

def add_client(clientId, clientSecret, clientMail):
    query = "INSERT INTO public.user (\"use_name\", \"use_password\", \"use_mail\") VALUES (%s,%s,%s)"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        c.execute(query, (clientId, clientSecret, clientMail))
        c.close()
        cnx_db.close_commit_db(c, cnx)
        return True
    else:
        return False


def get_user_by_name(user_name):
    query = "SELECT * FROM public.user WHERE use_name = %s"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        try:
            c.execute(query, (user_name,))
            if c.rowcount == 1:
                return 1
            else:
                return 0
        finally:
            c.close()
            cnx_db.close_commit_db(c, cnx)
    else:
        raise Exception("The connection could not be established!")


def get_userMail(user_mail):
    query = "SELECT * FROM public.user WHERE use_mail = %s"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        try:
            c.execute(query, (user_mail,))
            if c.rowcount == 1:
                return 1
            else:
                return 0
        finally:
            c.close()
            cnx_db.close_commit_db(c, cnx)
    else:
        raise Exception("The connection could not be established!")


def get_userId_by_name(user_name):
    query = "SELECT use_id FROM public.user WHERE use_name = %s"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        try:
            c.execute(query, (user_name,))
            rows = c.fetchall()
            user_id = None
            if c.rowcount == 1:
                user_id = rows[0][0]
                return user_id
            else:
                return False
        finally:
            c.close()
            cnx_db.close_commit_db(c, cnx)
    else:
        raise Exception("The connection could not be established!")


def delete_client(clientId, clientSecret, isAdmin):
    query = "DELETE FROM clients WHERE (\"ClientId\", \"ClientSecret\", \"IsAdmin\") VALUES (%s,%s,%s)"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        c.execute(query, (clientId, clientSecret, isAdmin))
        c.close()
        cnx_db.close_commit_db(c, cnx)
        return True
    else:
        return False


def authenticate(user_name, user_password):
    query = "SELECT * FROM public.user WHERE use_name = %s AND use_password = %s"
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        c.execute(query, (user_name, user_password))
        rows = c.fetchall()
        resp_user = False
        if c.rowcount == 1:
            for r in rows:
                resp_user = {"use_id": r[0], "use_name": r[1], "use_admin": r[4]}
                break
            c.close()
            cnx_db.close_commit_db(c, cnx)
            return resp_user
        else:
            return resp_user




def create_clients():
    cnx = cnx_db.open_db()
    if cnx is not None:
        c = cnx.cursor()
        c.execute('CREATE TABLE public.user ('
                  '"use_id" integer NOT NULL GENERATED ALWAYS AS IDENTITY ( INCREMENT 1 START 1 MINVALUE 1 MAXVALUE 2147483647 CACHE 1 ),'
                  '"use_name" character varying(128) COLLATE pg_catalog."default" NOT NULL,'
                  '"use_password" character varying(256) COLLATE pg_catalog."default" NOT NULL,'
                  '"IsAdmin" boolean NOT NULL,'
                  'CONSTRAINT clients_pkey PRIMARY KEY ("Id"),'
                  'CONSTRAINT "ClientId" UNIQUE ("ClientId"));')
        c.execute('CREATE TABLE public.blacklist('
                  'token character varying(256) COLLATE pg_catalog."default" NOT NULL))')
        c.close()
    cnx_db.close_commit_db(c, cnx)
