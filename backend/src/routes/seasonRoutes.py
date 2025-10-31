from flask import Blueprint, jsonify

season_bp = Blueprint('season_bp', __name__, url_prefix='/api/season')

@season_bp.route('/current', methods=['GET'])
def current_season():
    return jsonify({"season": "Season 1", "status": "Active"})