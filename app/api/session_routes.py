from flask import Blueprint, jsonify, request
import json
from ..models import User
from flask_wtf.csrf import generate_csrf
# from flask_login import current_user, login_required, login_user
from flask_jwt_extended import (
    get_jwt_identity, create_access_token, jwt_required,
    unset_jwt_cookies, set_access_cookies, jwt_optional
)

session_routes = Blueprint('session', __name__)


@session_routes.route('/csrf/restore')
@jwt_optional
def restore_csrf():
    email = get_jwt_identity()
    print(email)
    if email:
        # user = current_user if current_user.is_authenticated else None
        user = User.query.filter_by(email=email).one()
        return {'csrf_token': generate_csrf(), 'current_user': user.to_dict()}
    return {'csrf_token': generate_csrf()}


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
        access_token = create_access_token(identity=email)
        resp = jsonify(current_user=user.to_dict())
        set_access_cookies(resp, access_token)
        return resp, 200

    return {'errors': ['Invalid email or password']}, 401


@session_routes.route('/logout', methods=['POST'])
@jwt_required
def logout():
    resp = jsonify({'msg': 'You have been logged out'})
    unset_jwt_cookies(resp)
    return resp, 200
