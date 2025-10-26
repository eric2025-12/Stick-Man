# src/app.py
from flask import Flask
from src.config.db import db

# Import your Blueprints
from src.routes.auth_routes import auth_bp
from src.routes.game_routes import game_bp
from src.routes.leaderboard_routes import leaderboard_bp
from src.routes.season_routes import season_bp

def create_app():
    app = Flask(__name__)

    # Database configuration
    app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///stickman.db'
    app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

    # Initialize database
    db.init_app(app)

    # Register Blueprints
    app.register_blueprint(auth_bp)
    app.register_blueprint(game_bp)
    app.register_blueprint(leaderboard_bp)
    app.register_blueprint(season_bp)

    # Test route
    @app.route('/')
    def home():
        return "Stickman Arena Backend is Running!"

    return app


app = create_app()
