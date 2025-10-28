from flask import Flask
from flask_cors import CORS
from flask_migrate import Migrate       # ✅ Import Migrate
from models import db
from config import Config
from routes.auth_routes import auth_bp
from routes.game_routes import game_bp

def create_app():
    app = Flask(__name__)
    app.config.from_object(Config)

    CORS(app)
    db.init_app(app)

    # ✅ Initialize Flask-Migrate
    migrate = Migrate(app, db)

    # Register blueprints
    app.register_blueprint(auth_bp, url_prefix="/api/auth")
    app.register_blueprint(game_bp, url_prefix="/api/game")

    @app.route("/")
    def home():
        return {"message": "Stick-Man Flask Backend Running"}

    return app

# ✅ Create app instance
app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
