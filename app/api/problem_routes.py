from flask import Blueprint, jsonify, request
from app.models import User, Problem

problem_routes = Blueprint('problems', __name__)

@problem_routes.route('/') #Route for getting all problems
def index():
    problems = Problem.query.all()
    return {"problems": [problem.to_dict() for problem in problems]}

@problem_routes.route('/<problem_param>') #Route for getting a single problem
def get_single_problem(problem_param):
    problem_id = int(problem_param)
    
    response = Problem.query.filter(problem_id == Problem.id).all()

    return {"problem": [problem.to_dict() for problem in response]}
