from flask import Blueprint, jsonify, request
import json
from ..models import db, User
from flask_wtf.csrf import generate_csrf
# from flask_login import current_user, login_required, login_user
from flask_jwt_extended import (
    get_jwt_identity, create_access_token, jwt_required,
    unset_jwt_cookies, set_access_cookies, jwt_optional,
    create_refresh_token, set_refresh_cookies
)

session_routes = Blueprint('session', __name__)


@session_routes.route('/csrf/restore')
@jwt_optional
def restore_csrf():
    print(1)

    email = get_jwt_identity()
    print(2)
    print(email)
    print(3)
    if email:
        # Create the tokens we will be sending back to the user
        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)

        # user = current_user if current_user.is_authenticated else None
        print(4)
        user = User.query.filter_by(email=email).one()

        # Set the JWT cookies in the response
        resp = jsonify(current_user=user.to_dict(), csrf_token=generate_csrf())
        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)
        return resp, 200

        # print(5)
        # return {'csrf_token': generate_csrf(), 'current_user': user.to_dict()}
    print(6)
    return {'csrf_token': generate_csrf()}


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
    # Create the tokens we will be sending back to the user
    access_token = create_access_token(identity=email)
    refresh_token = create_refresh_token(identity=email)

    # Set the JWT cookies in the response
    resp = jsonify(current_user=user.to_dict())
    set_access_cookies(resp, access_token)
    set_refresh_cookies(resp, refresh_token)
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
    print(authenticated)
    print(user)

    if authenticated:
        # Create the tokens we will be sending back to the user
        access_token = create_access_token(identity=email)
        refresh_token = create_refresh_token(identity=email)

        # Set the JWT cookies in the response
        resp = jsonify(current_user=user.to_dict())
        set_access_cookies(resp, access_token)
        set_refresh_cookies(resp, refresh_token)
        return resp, 200

    return {'errors': ['Invalid email or password']}, 401


@session_routes.route('/logout', methods=['POST'])
@jwt_required
def logout():
    resp = jsonify({'msg': 'You have been logged out'})
    unset_jwt_cookies(resp)
    return resp, 200