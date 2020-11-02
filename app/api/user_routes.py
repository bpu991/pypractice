from flask import Blueprint, jsonify, request
from app.models import db, User, Attempt

user_routes = Blueprint('users', __name__)


@user_routes.route('/<user_param>')
def get_single_user(user_param):
    user_id = int(user_param)
    response = User.query.filter(user_id == User.id).one()
    return response.profile_info()


# Route for getting all of a user's attempts on every problem
@user_routes.route('/<user_param>/attempts')
def all_user_attempts(user_param):
    user_id = int(user_param)
    response = Attempt.query.filter(user_id == Attempt.user_id).all()
    return {"attempts": [attempt.to_dict() for attempt in response]}


# Route for getting most recent attempt on a problem
@user_routes.route('/<user_param>/attempts/<problem_param>')
def get_attempt(user_param, problem_param):
    user_id = int(user_param)
    problem_id = int(problem_param)
    attempt = Attempt.query.filter(user_id == Attempt.user_id
                                   and problem_id ==
                                   Attempt.problem_id).order_by(
        Attempt.id.desc()).first()

    return {'attempts': attempt.to_dict()}


# Route for adding new attempts to the db
@user_routes.route('/<user_param>/attempts/<problem_param>', methods=["POST"])
def post_attempt(user_param, problem_param):
    user_id = int(user_param)
    problem_id = int(problem_param)

    data = request.json

    attempt = Attempt(user_id=user_id, problem_id=problem_id,
                      saved_code=data['code'], solved=data['solved'])

    db.session.add(attempt)
    db.session.commit()
    attempts = Attempt.query.filter_by(user_id=user_id,
                                       problem_id=problem_id).all()

    return {"attempts": [attempt.to_dict() for attempt in attempts],
            "attempted": True,
            "solved": True in (attempt.solved for attempt in attempts)}


# Route for updating a problem attempt to the db
@user_routes.route('/attempts/<attempt_param>', methods=["PUT"])
def update_attempt(user_param, problem_param):
    attemptId = int(attempt_param)

    data = request.json

    attempt = Attempt.query.filter_by()

    db.session.commit()

    return attempt.to_dict()
