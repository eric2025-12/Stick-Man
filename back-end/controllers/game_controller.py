from flask import request, jsonify
from models import db, GameProgress, User
from utils.decorators import login_required

@login_required
def save_progress(user_id):
    data = request.get_json()
    level = data.get('level', 1)
    score = data.get('score', 0)
    lives = data.get('lives', 3)

    # Check if user already has progress
    progress = GameProgress.query.filter_by(user_id=user_id).first()

    if progress:
        progress.level = level
        progress.score = score
        progress.lives = lives
    else:
        progress = GameProgress(
            user_id=user_id, level=level, score=score, lives=lives
        )
        db.session.add(progress)

    db.session.commit()
    return jsonify({"message": "Progress saved successfully!"}), 200


@login_required
def load_progress(user_id):
    progress = GameProgress.query.filter_by(user_id=user_id).first()

    if not progress:
        return jsonify({"message": "No saved progress found."}), 404

    return jsonify({
        "level": progress.level,
        "score": progress.score,
        "lives": progress.lives,
        "last_updated": progress.last_updated
    }), 200


def leaderboard():
    # Top players by highest score
    top_scores = GameProgress.query.join(User).order_by(GameProgress.score.desc()).limit(10).all()

    leaderboard_data = []
    for progress in top_scores:
        leaderboard_data.append({
            "username": progress.user.username,
            "level": progress.level,
            "score": progress.score
        })

    return jsonify({"leaderboard": leaderboard_data}), 200
