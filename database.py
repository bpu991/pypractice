from dotenv import load_dotenv
load_dotenv()

from app import app, db
from app.models import User, Attempt, Problem, Test

with app.app_context():
  db.drop_all()
  db.create_all()

  ian = User(username='Ian', email = 'ian@aa.io', password= 'password')
  javier = User(username='Javier', email='javier@aa.io', password='password')
  dean = User(username='Dean', email='dean@aa.io', password='password')
  angela = User(username='Angela', email='angela@aa.io', password='password')
  soonmi = User(username='Soon-Mi', email='soonmi@aa.io', password='password')
  alissa = User(username='Alissa', email='alissa@aa.io', password='password')

  problem_doubleInput = Problem(title='Doubler', instructions='Define a function called double that takes a number and returns double its value.', default_content='', solution='def double(num):\n  return num*2', difficulty=1)
  problem2 = Problem(title='problem 2', instructions='Solve the problem', default_content='1 + 2', solution='3', difficulty=1)

  test_doubleInput_1 = Test(problem=problem_doubleInput, call='double(5)', expected='10')
  test_doubleInput_2 = Test(problem=problem_doubleInput, call='double(0)', expected='0')
  test_doubleInput_3 = Test(problem=problem_doubleInput, call='double(-5)', expected='-10')

  attempt1 = Attempt(user=ian, problem=problem_doubleInput, saved_code='def double(num):\n  return num*2', solved=True)
  attempt2 = Attempt(user=javier, problem=problem_doubleInput, saved_code='def double(x):\n  return num**2', solved=False)
  attempt3 = Attempt(user=ian, problem=problem_doubleInput, saved_code='def double(n):\n  pass', solved=False)

  db.session.add(ian)
  db.session.add(javier)
  db.session.add(dean)
  db.session.add(angela)
  db.session.add(soonmi)
  db.session.add(alissa)

  db.session.add(problem_doubleInput)
  db.session.add(problem2)

  db.session.commit()
