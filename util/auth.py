from functools import wraps

from flask import request, Response

from documents.user_document import User
from passlib.hash import pbkdf2_sha256


def check_auth(nickname, password):
    users = User.objects(nickname=nickname)
    if len(users) <= 0:
        return False
    user = users[0]
    return user.nickname == nickname and pbkdf2_sha256.verify(password, user.password)


def authenticate():
    """Sends a 401 response that enables basic auth"""
    return Response(
        'Could not verify your access level for that URL.\n'
        'You have to login with proper credentials', 401,
        {'WWW-Authenticate': 'Basic realm="Login Required"'})


def requires_auth(f):
    @wraps(f)
    def decorated(*args, **kwargs):
        auth = request.authorization
        if not auth or not check_auth(auth.username, auth.password):
            return authenticate()
        return f(*args, **kwargs)

    return decorated