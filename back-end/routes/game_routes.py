from flask import Blueprint
from controllers.game_controller import save_progress, load_progress, leaderboard

game_bp = Blueprint('game_bp', __name__)

game_bp.route('/save-progress', methods=['POST'])(save_progress)
game_bp.route('/load-progress', methods=['GET'])(load_progress)
game_bp.route('/leaderboard', methods=['GET'])(leaderboard)
