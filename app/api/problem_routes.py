from flask import Blueprint, jsonify, request
from app.models import User, Problem, Test
from sqlalchemy.orm import joinedload, load_only

problem_routes = Blueprint('problems', __name__)

@problem_routes.route('/') #Route for getting (only) id, title, & difficulty of all problems
def index():
    problems = Problem.query.with_entities(Problem.id, Problem.title, Problem.difficulty).all()
    return {"problems": {problem[0]:{'id': problem[0], 'title': problem[1], 'difficulty': problem[2]} for problem in problems}}

# Route for getting a single problem
@problem_routes.route('/<problem_param>')
def get_single_problem(problem_param):
    problem_id = int(problem_param)
    response = Problem.query.get(problem_id)
    return response.to_dict()
