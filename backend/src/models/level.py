from datetime import datetime
from src.config.db import db

class Level(db.Model):
    __tablename__ = "levels"

    id = db.Column(db.Integer, primary_key=True)
    level_number = db.Column(db.Integer, nullable=False)
    score = db.Column(db.Integer, default=0)
    completed = db.Column(db.Boolean, default=False)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)

    # Foreign key to User
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)

    def __repr__(self):
        status = "Completed" if self.completed else "In Progress"
        return f"<Level {self.level_number} ({status}) for User {self.user_id}>"
