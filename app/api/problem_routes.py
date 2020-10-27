from flask import Blueprint, jsonify, request
from app.models import User, Problem

problem_routes = Blueprint('problems', __name__)


# Route for getting all problems
@problem_routes.route('/')
def index():
    problems = Problem.query.all()
    return {"problems":
            {problem.to_dict()["id"]: problem.to_dict()
                for problem in problems}}


# Route for getting a single problem
@problem_routes.route('/<problem_param>')
def get_single_problem(problem_param):
    problem_id = int(problem_param)

    response = Problem.query.filter(problem_id == Problem.id).one()

    return {"problem": response.to_dict()}
