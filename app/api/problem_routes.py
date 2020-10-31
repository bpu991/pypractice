from flask import Blueprint, jsonify, request
from app.models import User, Problem, Test
from sqlalchemy.orm import joinedload, load_only
from flask_login import current_user


problem_routes = Blueprint('problems', __name__)


# Route for getting (only) id, title, & difficulty of all problems
@problem_routes.route('')
def index():
    user_id = current_user.id if current_user.is_authenticated else None
    if user_id:
        problems = Problem.query.all()
        return {"problems": {problem.id:
                             problem.dict_with_user_attempts(user_id)
                             for problem in problems}}
    else:
        problems = Problem.query.with_entities(
            Problem.id, Problem.title,
            Problem.difficulty, Problem.category).all()
        return {"problems": {problem[0]: {
            'id': problem[0],
            'title': problem[1],
            'difficulty': problem[2],
            'category': problem[3]} for problem in problems}
        }


@problem_routes.route('/<problem_param>')  # Route for getting a single problem
def get_single_problem(problem_param):
    user_id = current_user.id if current_user.is_authenticated else None
    problem_id = int(problem_param)
    response = Problem.query.get(problem_id)
    return response.full_with_user_attempts(user_id)
