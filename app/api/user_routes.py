from flask import Blueprint, jsonify, request
from app.models import User

user_routes = Blueprint('users', __name__)

@user_routes.route('/')
def index():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}

@user_routes.route('/', methods=["POST"])
def create_user():
  data = request.json
  print(data)
  return data