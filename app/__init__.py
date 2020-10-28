import os
from flask import Flask, render_template, request, session
from flask_migrate import Migrate
from flask_cors import CORS
from flask_wtf.csrf import CSRFProtect, generate_csrf
from flask_jwt_extended import JWTManager


from app.models import db, User
from app.api.user_routes import user_routes
from app.api.problem_routes import problem_routes
from app.api.session_routes import session_routes

from app.config import Config

app = Flask(__name__)

app.config.from_object(Config)
app.config['JWT_TOKEN_LOCATION'] = ['cookies']
app.register_blueprint(user_routes, url_prefix='/api/users')
app.register_blueprint(problem_routes, url_prefix='/api/problems')
app.register_blueprint(session_routes, url_prefix='/api/session')
db.init_app(app)
Migrate(app, db)

# create login manager
jwt = JWTManager(app)
# login.login_view = 'session.login'


# Application Security
CORS(app)
CSRFProtect(app)


# get User object from database on application load
# @login.user_loader
# def load_user(id):
#     return User.query.get(int(id))


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
