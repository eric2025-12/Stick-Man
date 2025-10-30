progress_data = {}  # In-memory dictionary simulating a small DB


def save_progress(user_id, level, score):
    """Save a user's progress."""
    progress_data[user_id] = {"level": level, "score": score}
    return True


def get_progress(user_id):
    """Retrieve a user's saved progress."""
    return progress_data.get(user_id, None)
 