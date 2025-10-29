from utils.game_engine import calculate_score, reward_player


def test_calculate_score_basic():
    score = calculate_score(10, 2)
    assert score == 10 * 10 + 2 * 50


def test_calculate_score_with_bonus():
    score = calculate_score(10, 1, bonus=200)
    assert score == 10 * 10 + 1 * 50 + 200


def test_reward_player_gold():
    assert reward_player(1200) == "Gold Medal"


def test_reward_player_silver():
    assert reward_player(600) == "Silver Medal"


def test_reward_player_bronze():
    assert reward_player(150) == "Bronze Medal"


def test_reward_player_try_again():
    assert reward_player(50) == "Try Again"
 