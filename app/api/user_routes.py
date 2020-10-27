from flask import Blueprint, jsonify, request
from app.models import User, Attempt

user_routes = Blueprint('users', __name__)

@user_routes.route('/') #Route for getting all the users in the db
def index():
  response = User.query.all()
  return { "users": [user.to_dict() for user in response]}

@user_routes.route('/<user_param>/attempts') #Route for getting all of a user's attempts on every problem
def all_user_attempts(user_param):
  user_id = int(user_param)
  response = Attempt.query.filter(user_id == Attempt.user_id).all()
  return {"attempts": [attempt.to_dict() for attempt in response]}


@user_routes.route('/<user_param>/attempts/<problem_param>') #Route for getting most recent attempt on a problem
def get_attempt(user_param, problem_param):
  user_id = int(user_param)
  problem_id = int(problem_param)
  attempt = Attempt.query.filter(user_id == Attempt.user_id and problem_id == Attempt.problem_id).order_by(Attempt.id.desc()).first()

  return {'attempts': attempt.to_dict()}

@user_routes.route('/<user_param>/attempts/<problem_param>', methods=["POST"])
def post_attempt(user_param, problem_param):
  user_id = int(user_param)
  problem_id = int(problem_param)

  attempt = Attempt.query.filter(user_id == Attempt.user_id and problem_id == Attempt.problem_id).one_or_none()
  
  # if attempt: # if there is an attempt, update existing attempt with the new attempt

  # else: # if there is no attempt, make one