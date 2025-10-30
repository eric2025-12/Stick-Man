def calculate_score(distance, enemies_defeated, bonus=0):
    """Calculate player score based on performance."""
    return distance * 10 + enemies_defeated * 50 + bonus


def reward_player(score):
    """Determine rewards based on score."""
    if score >= 1000:
        return "Gold Medal"
    elif score >= 500:
        return "Silver Medal"
    elif score >= 100:
        return "Bronze Medal"
    else:
        return "Try Again"
 