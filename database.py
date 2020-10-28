from app.models import User, Attempt, Problem
from app import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()

    ian = User(username='Ian', email='ian@aa.io', password='password')
    javier = User(username='Javier', email='javier@aa.io', password='password')
    dean = User(username='Dean', email='dean@aa.io', password='password')
    angela = User(username='Angela', email='angela@aa.io', password='password')
    soonmi = User(username='Soon-Mi', email='soonmi@aa.io',
                  password='password')
    alissa = User(username='Alissa', email='alissa@aa.io', password='password')

    problem1 = Problem(title='problem 1', instructions='Solve the problem',
                       default_content='1 + 1', solution='2', tests='idk', difficulty=1)
    problem2 = Problem(title='problem 2', instructions='Solve the problem',
                       default_content='1 + 2', solution='3', tests='idk', difficulty=1)

    attempt1 = Attempt(user=ian, problem=problem1)
    attempt2 = Attempt(user=javier, problem=problem1)
    attempt3 = Attempt(user=ian, problem=problem1)

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)

    db.session.add(problem1)
    db.session.add(problem2)

    db.session.commit()
