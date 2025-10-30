from flask import Blueprint, jsonify
from src.models.user import User

leaderboard_bp = Blueprint('leaderboard_bp', __name__, url_prefix='/api/leaderboard')

@leaderboard_bp.route('/', methods=['GET'])
def leaderboard():
    users = User.query.order_by(User.score.desc()).limit(10).all()
    data = [{"username": u.username, "score": u.score} for u in users]
    return jsonify({"leaderboard": data})