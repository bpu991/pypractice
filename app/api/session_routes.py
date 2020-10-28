from flask import Blueprint, jsonify, request
from ..models import User
from flask_wtf.csrf import generate_csrf
from flask_login import current_user, login_required, login_user

session_routes = Blueprint('session', __name__)


@session_routes.route('/csrf/restore')
def restore_csrf():
    user = current_user if current_user.is_authenticated else None
    return {'csrf_token': generate_csrf(), "current_user": user}


# user login route
@session_routes.route('/login', methods=['GET', 'POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": ["Missing JSON in request"]}), 400
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email or not password:
        return {'errors': ["Missing required parameters"]}, 400

    authenticated, user = User.authenticate(email, password)
    print("USER____________", user)
    print(authenticated)
    print(user)
    if authenticated:
        login_user(user)
        return {'current_user': user.id}

    return {'errors': ['Invalid email or password']}, 401


@session_routes.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    return {'msg': 'You have been logged out'}, 200
