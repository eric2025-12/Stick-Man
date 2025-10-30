from utils.progress_manager import save_progress, get_progress



def test_save_and_get_progress():
    save_progress("player1", 5, 1200)
    result = get_progress("player1")
    assert result is not None
    assert result["level"] == 5
    assert result["score"] == 1200


def test_get_progress_not_found():
    result = get_progress("unknown_user")
    assert result is None
 