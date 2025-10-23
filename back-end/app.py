from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db, bcrypt, User, GameProgress
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)
