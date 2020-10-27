from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model, UserMixin):
  __tablename__ = 'users'

  id = db.Column(db.Integer, primary_key = True)
  username = db.Column(db.String(40), nullable = False, unique = True)
  email = db.Column(db.String(255), nullable = False, unique = True)
  hashed_password = db.Column(db.String(128), nullable = False)

  attempts = db.relationship("Attempt", back_populates="user")

  def to_dict(self):
    return {
      "id": self.id,
      "username": self.username,
      "email": self.email
    }

  @property
  def password(self):
    return self.hashed_password

  @password.setter
  def password(self, password):
    self.hashed_password = generate_password_hash(password)

  def check_password(self, password):
    return check_password_hash(self.password, password)


class Attempt(db.Model):
  __tablename__ = 'attempts'

  id = db.Column(db.Integer, primary_key = True)
  user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
  problem_id = db.Column(db.Integer, db.ForeignKey("problems.id"), nullable=False)
  saved_code = db.Column(db.String)
  solved = db.Column(db.Boolean)

  user = db.relationship("User", back_populates="attempts")
  problem = db.relationship("Problem", back_populates="attempts")

  def to_dict(self):
    return {
        "id": self.id,
        "user_id": self.user_id,
        "problem_id": self.problem_id,
        "saved_code": self.saved_code,
        "solved": self.solved,
    }

class Problem(db.Model):
  __tablename__ = 'problems'

  id = db.Column(db.Integer, primary_key = True)
  title = db.Column(db.String, nullable = False)
  instructions = db.Column(db.String, nullable = False)
  default_content = db.Column(db.String, nullable = False)
  solution = db.Column(db.String, nullable = False)
  tests = db.Column(db.String, nullable = False)
  difficulty = db.Column(db.Integer, nullable = False)

  attempts = db.relationship("Attempt", back_populates="problem")

  def to_dict(self):
    return {
        "id": self.id,
        "title": self.title,
        "instructions": self.instructions,
        "default content": self.default_content,
        "solution": self.solution,
        "test": self.tests,
        "difficulty": self.difficulty
    }
