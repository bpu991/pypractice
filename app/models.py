from flask_login import UserMixin
from flask_sqlalchemy import SQLAlchemy
from werkzeug.security import generate_password_hash, check_password_hash

db = SQLAlchemy()


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    email = db.Column(db.String(255), nullable=False, unique=True)
    hashed_password = db.Column(db.String(128), nullable=False)

    attempts = db.relationship("Attempt", back_populates="user")

    def profile_info(self):
        return {
              "id": self.id,
              "username": self.username,
              "solved_problems": len({attempt.problem_id
                                      for attempt in self.attempts
                                      if (attempt.solved)}),
              "attempted_problems": len({attempt.problem_id
                                        for attempt in self.attempts})
        }

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def to_dict(self):
        return {
            "id": self.id,
            "username": self.username,
            "email": self.email,
            # "attempts": [attempt.to_dict() for attempt in self.attempts] if
            # self.attempts else None
        }

    @classmethod
    def authenticate(cls, email, password):
        user = cls.query.filter(User.email == email).scalar()
        if user:
            return check_password_hash(user.hashed_password, password), user
        else:
            return None, None


class Attempt(db.Model):
    __tablename__ = 'attempts'

    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey("users.id"), nullable=False)
    problem_id = db.Column(db.Integer, db.ForeignKey(
        "problems.id"), nullable=False)
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
            "solved": self.solved
        }


class Problem(db.Model):
    __tablename__ = 'problems'

    id = db.Column(db.Integer, primary_key=True)
    title = db.Column(db.String, nullable=False)
    instructions = db.Column(db.String, nullable=False)
    default_content = db.Column(db.String, nullable=False)
    solution = db.Column(db.String, nullable=False)
    difficulty = db.Column(db.Integer, nullable=False)
    category = db.Column(db.String)

    attempts = db.relationship("Attempt", back_populates="problem")
    tests = db.relationship("Test", back_populates="problem")

    def to_dict(self):
        return {
            "id": self.id,
            "title": self.title,
            "instructions": self.instructions,
            "default_content": self.default_content,
            "solution": self.solution,
            "difficulty": self.difficulty,
            "category": self.category,
            "attempts": [attempt.to_dict() for attempt in self.attempts] if
            self.attempts else None,
            "tests": [test.to_dict() for test in self.tests] if self.tests
            else None,
        }

    def dict_with_user_attempts(self, user_id):
        return {
            "id": self.id,
            "title": self.title,
            "difficulty": self.difficulty,
            "category": self.category,
            "attempted": len([attempt for attempt in self.attempts
                             if user_id == attempt.user_id]) > 0,
            "solved": len([attempt for attempt in self.attempts
                          if user_id == attempt.user_id
                          and attempt.solved]) > 0,
        }

    def full_with_user_attempts(self, user_id):
        return {
            "id": self.id,
            "title": self.title,
            "instructions": self.instructions,
            "default_content": self.default_content,
            "solution": self.solution,
            "difficulty": self.difficulty,
            "category": self.category,
            "attempted": len([attempt for attempt in self.attempts
                             if user_id == attempt.user_id]) > 0,
            "solved": len([attempt for attempt in self.attempts
                          if user_id == attempt.user_id
                          and attempt.solved]) > 0,
            "attempts": [attempt.to_dict() for attempt in self.attempts
                         if user_id == attempt.user_id],
            "tests": [test.to_dict() for test in self.tests] if self.tests
            else None,
        }


class Test(db.Model):
    __tablename__ = 'tests'

    id = db.Column(db.Integer, primary_key=True)
    problem_id = db.Column(db.Integer, db.ForeignKey(
        "problems.id"), nullable=False)
    call = db.Column(db.String, nullable=False)
    expected = db.Column(db.String, nullable=False)

    problem = db.relationship("Problem", back_populates="tests")

    def to_dict(self):
        return {
            "id": self.id,
            "problem_id": self.problem_id,
            "call": self.call,
            "expected": self.expected
        }
