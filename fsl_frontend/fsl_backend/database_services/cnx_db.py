import os
import psycopg2
from flask import current_app as app


def open_db():
    connection = None
    try:
        # Psycopg is a PostgreSQL database adapter
        connection = psycopg2.connect(
            "dbname="+str(app.config["DBNAME"])+" "
            "user="+str(app.config["DBUSER"])+" "
            "host="+str(app.config["DBHOST"])+" "
            "password="+str(app.config["DBPASS"]))
        print("You connection was successfully established!")
        return connection
    except (Exception, psycopg2.DatabaseError) as error:
        print(error)
        if connection is not None:
            connection.close()
        return False


def close_commit_db(curser, connection):
    connection.commit()
    connection.close()
    print("You connection was successfully closed!")
