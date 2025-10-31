# backend/app.py
import sys
import os
from flask import Flask

# ✅ Add src folder to the Python path BEFORE any imports from it
sys.path.append(os.path.join(os.path.dirname(__file__), "src"))

# Database
from src.config.db import db

# Blueprints (match your actual filenames)
from src.routes.authRoutes import auth_bp
from src.routes.gameRoutes import game_bp
from src.routes.leaderboardRoutes import leaderboard_bp
from src.routes.seasonRoutes import season_bp

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


# Create the Flask app
app = create_app()

if __name__ == "__main__":
    # ✅ Bind to all interfaces to avoid connection refused issues
    app.run(host="0.0.0.0", port=5000, debug=True)
