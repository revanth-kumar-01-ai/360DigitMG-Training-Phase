import mysql.connector 
from EmbryoQualityCheck.flask_backend_app.app.config import Config


def get_db_connection():
    connection = mysql.connector.connect(
        host = Config.DB_HOST,
        user=Config.DB_USER,
        password=Config.DB_PASSWORD,
        database=Config.DB_NAME,
        port=Config.DB_PORT
    )
    return connection


