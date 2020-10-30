import os
import sys
import logging
from app.config import Config
from flask import Flask, render_template, request, session
from flask_migrate import Migrate
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
# from flask_jwt_extended import JWTManager
from flask_login import LoginManager

from app.models import db, User
from app.api.user_routes import user_routes
from app.api.problem_routes import problem_routes
from app.api.session_routes import session_routes

app = Flask(__name__)

app.logger.setLevel(logging.ERROR)
app.logger.addHandler(logging.StreamHandler(sys.stdout))


app.config.from_object(Config)
# app.config['JWT_TOKEN_LOCATION'] = ['cookies']
# app.config['JWT_COOKIE_CSRF_PROTECT'] = False
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(problem_routes, url_prefix='/api/problems')
app.register_blueprint(session_routes, url_prefix='/api/session')
db.init_app(app)
Migrate(app, db)

# create login manager
login_manager = LoginManager(app)


@login_manager.user_loader
def load_user(user_id):
    return User.query.get(user_id)


# Application Security
CORS(app)
CSRFProtect(app)


@app.after_request
def inject_csrf_token(response):
    response.set_cookie(
        'csrf_token',
        generate_csrf(),
        secure=True if os.environ.get('FLASK_ENV') else False,
        samesite='Strict' if os.environ.get('FLASK_ENV') else None,
        httponly=True)
    return response


@app.route('/', defaults={'path': ''})
@app.route('/<path:path>')
def react_root(path):
    print("path", path)
    if path == 'favicon.ico':
        return app.send_static_file('favicon.ico')
    return app.send_static_file('index.html')
