from flask import Blueprint, jsonify, request
from ..models import User
from flask_wtf.csrf import generate_csrf
from flask_login import current_user

session_routes = Blueprint('session', __name__)

@session_routes.route('/csrf/restore')
def restore_csrf():
    id = current_user.id if current_user.is_authenticated else None
    return {'csrf_token': generate_csrf(), "current_user_id": id}
