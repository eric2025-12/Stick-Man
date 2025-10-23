from flask import Flask, request, jsonify
from flask_cors import CORS
from config import Config
from models import db, bcrypt, User, GameProgress
from flask_jwt_extended import (
    JWTManager, create_access_token,
    jwt_required, get_jwt_identity
)

app = Flask(__name__)
app.config.from_object(Config)
db.init_app(app)
bcrypt.init_app(app)
CORS(app)
jwt = JWTManager(app)

# Create database
with app.app_context():
    db.create_all()

# ✅ User Registration
@app.route('/api/register', methods=['POST'])
def register():
    data = request.json
    if User.query.filter_by(username=data['username']).first():
        return jsonify({'message': 'Username already exists'}), 400

    hashed_pw = bcrypt.generate_password_hash(data['password']).decode('utf-8')
    new_user = User(username=data['username'], password=hashed_pw)
    db.session.add(new_user)
    db.session.commit()
    return jsonify({'message': 'User created successfully'}), 201

# ✅ User Login → Returns JWT Token
@app.route('/api/login', methods=['POST'])
def login():
    data = request.json
    user = User.query.filter_by(username=data['username']).first()

    if user and bcrypt.check_password_hash(user.password, data['password']):
        token = create_access_token(identity=user.id)
        return jsonify({'message': 'Login successful', 'token': token, 'user_id': user.id})
    return jsonify({'message': 'Invalid username or password'}), 401

# ✅ Save Game Progress (Protected)
@app.route('/api/save-progress', methods=['POST'])
@jwt_required()
def save_progress():
    user_id = get_jwt_identity()
    data = request.json

    progress = GameProgress.query.filter_by(user_id=user_id).first()
    if progress:
        progress.level = data.get('level', progress.level)
        progress.score = data.get('score', progress.score)
        progress.lives = data.get('lives', progress.lives)
    else:
        progress = GameProgress(user_id=user_id, **data)
        db.session.add(progress)

    db.session.commit()
    return jsonify({'message': 'Progress saved!'})

# ✅ Get User Game Progress (Protected)
@app.route('/api/get-progress', methods=['GET'])
@jwt_required()
def get_progress():
    user_id = get_jwt_identity()
    progress = GameProgress.query.filter_by(user_id=user_id).first()

    if not progress:
        return jsonify({'message': 'No progress found'}), 404

    return jsonify({
        'level': progress.level,
        'score': progress.score,
        'lives': progress.lives
    })

# ✅ Leaderboard (Public)
@app.route('/api/leaderboard', methods=['GET'])
def leaderboard():
    leaders = GameProgress.query.order_by(GameProgress.score.desc()).limit(10).all()
    return jsonify([
        {'user_id': p.user_id, 'score': p.score, 'level': p.level}
        for p in leaders
    ])

if __name__ == '__main__':
    app.run(debug=True)
