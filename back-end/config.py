import os

# Absolute path to project directory
basedir = os.path.abspath(os.path.dirname(__file__))

class Config:
    SECRET_KEY = "your-secret-key"  # replace with a secure key
    # SQLite DB inside instance folder
    SQLALCHEMY_DATABASE_URI = "sqlite:///" + os.path.join(basedir, "instance", "stickman.db")
    SQLALCHEMY_TRACK_MODIFICATIONS = False
