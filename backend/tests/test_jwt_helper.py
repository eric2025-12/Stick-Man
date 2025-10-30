import pytest
from utils.jwt_helper import generate_token, verify_token



def test_generate_and_verify_token():
    token = generate_token(1)
    decoded = verify_token(token)
    assert "user_id" in decoded
    assert decoded["user_id"] == 1


def test_expired_token(monkeypatch):
    from utils import jwt_helper
    import datetime

    # Patch datetime to simulate expiry
    class FakeDateTime(datetime.datetime):
        @classmethod
        def utcnow(cls):
            return super().utcnow() - datetime.timedelta(hours=2)

    monkeypatch.setattr(jwt_helper.datetime, "datetime", FakeDateTime)

    token = generate_token(1)
    result = verify_token(token)
    assert "error" in result
 