from flask import request, jsonify
from functools import wraps
from utils.jwt_handler import decode_token

def login_required(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        token = None

        if 'Authorization' in request.headers:
            token = request.headers['Authorization'].split(" ")[1]

        if not token:
            return jsonify({"error": "Token missing!"}), 403

        user_id = decode_token(token)
        if not user_id:
            return jsonify({"error": "Invalid or expired token"}), 401

        return f(user_id, *args, **kwargs)

    return decorated
