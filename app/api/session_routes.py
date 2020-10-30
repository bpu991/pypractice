from flask import Blueprint, jsonify, request
import json
from ..models import db, User
from flask_wtf.csrf import generate_csrf
from flask_login import current_user, login_required, login_user, logout_user

session_routes = Blueprint('session', __name__)


@session_routes.route('/csrf/restore')
def restore_csrf():
    user = current_user.to_dict() if current_user.is_authenticated else None
    return {'csrf_token': generate_csrf(), "current_user": user}


# user signup route
@session_routes.route('/signup', methods=["POST"])
def signup():
    username = request.json.get('username', None)
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not username:
        return 'Username not found', 400
    if not email:
        return 'Email not found', 400
    if not password:
        return 'Password not found', 400

    user = User(username=username, email=email, password=password)

    db.session.add(user)
    db.session.commit()
    # to do: maybe add validators
    login_user(user)
    resp = jsonify(current_user=user.to_dict())
    return resp, 200


# user login route
@session_routes.route('/login', methods=['POST'])
def login():
    if not request.is_json:
        return jsonify({"msg": ["Missing JSON in request"]}), 400
    email = request.json.get('email', None)
    password = request.json.get('password', None)

    if not email:
        return jsonify({"msg": "Missing email parameter"}), 400
    if not password:
        return jsonify({"msg": "Missing password parameter"}), 400

    authenticated, user = User.authenticate(email, password)

    if authenticated:
        login_user(user)
        resp = jsonify(current_user=user.to_dict())
        return resp, 200

    return {'errors': ['Invalid email or password']}, 401


@session_routes.route('/logout', methods=['POST'])
@login_required
def logout():
    resp = jsonify({'msg': 'You have been logged out'})
    logout_user()
    return resp, 200
