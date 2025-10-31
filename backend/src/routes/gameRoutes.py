from flask import Blueprint, jsonify

game_bp = Blueprint('game_bp', __name__, url_prefix='/api/game')

@game_bp.route('/start', methods=['GET'])
def start_game():
    return jsonify({"message": "Game started!"})

@game_bp.route('/status', methods=['GET'])
def game_status():
    return jsonify({"status": "In progress"})