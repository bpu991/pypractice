from app.models import User, Attempt, Problem, Test
from app.models import User, Attempt, Problem
from app import app, db
from dotenv import load_dotenv
load_dotenv()


with app.app_context():
    db.drop_all()
    db.create_all()


    # Users

    ian = User(username='Ian', email='ian@aa.io', password='password')
    javier = User(username='Javier', email='javier@aa.io', password='password')
    dean = User(username='Dean', email='dean@aa.io', password='password')
    angela = User(username='Angela', email='angela@aa.io', password='password')
    soonmi = User(username='Soon-Mi', email='soonmi@aa.io',
                  password='password')
    alissa = User(username='Alissa', email='alissa@aa.io', password='password')


    # Problems

    ## Problem 1 - Sleep In (Warm-Up)
    problem_sleepin = Problem(title='Sleep In', instructions="Define a function called sleep_in that takes weekday and vacation parameters. Weekday is true if it is a weekday, and vacation is true if we are on vacation. We sleep in if it is not a weekday or we're on vacation. Return true if we sleep in.", default_content='def sleep_in(weekday, vacation):\n  pass\n', solution='def sleep_in(weekday, vacation):\n  return (not weekend) or vacation', difficulty=1, category='Warm-Up')

    test_sleepin_1 = Test(problem=problem_sleepin, call='sleep_in(True, True)', expected='True')
    test_sleepin_2 = Test(problem=problem_sleepin, call='sleep_in(True, False)', expected='False')
    test_sleepin_3 = Test(problem=problem_sleepin, call='sleep_in(False, True)', expected='True')

    ## Problem 2 - Monkey Trouble (Warm-Up)
    problem_monkeytrouble = Problem(title='Monkey Trouble', instructions="We have two monkeys, Zira and Galen, and the boolean parameters zira_smile and galen_smile that indicate whether each is smiling. We are in trouble if they are both smiling or if neither is smiling. Define a function called monkey_trouble that returns True if we are in trouble.", default_content='', solution='def (weekday, vacation):\n  return (not weekend) or vacation', difficulty=1, category='Warm-Up')

    test_monkeytrouble_1 = Test(problem=problem_monkeytrouble, call='monkey_trouble(True, True)', expected='True')
    test_monkeytrouble_2 = Test(problem=problem_monkeytrouble, call='monkey_trouble(False, False)', expected='True')
    test_monkeytrouble_3 = Test(problem=problem_monkeytrouble, call='monkey_trouble(True, False)', expected='False')

    ## Problem 3 - Sum Double (Warm-Up)
    problem_sumdouble = Problem(title='Sum Double', instructions='Given two int values, return their sum--unless the two values are the same, then return double their sum. Name your function sum_double.', default_content='', solution='def sum_double(num1, num2):\n  return num1+num2 if num1 != num2 else 2*(num1+num2)', difficulty=1, category='Warm-Up')

    test_sumdouble_1 = Test(problem=problem_sumdouble, call='sum_double(3, 5)', expected='8')
    test_sumdouble_2 = Test(problem=problem_sumdouble, call='sum_double(3, -3)', expected='0')
    test_sumdouble_3 = Test(problem=problem_sumdouble, call='sum_double(2, 2)', expected='8')

    ## Problem 4 - Diff21 (Warm-Up)
    problem_diff21 = Problem(title='Diff21', instructions='Given an int n, return the absolute difference between n and 21, unless n is greater than 21, then return double the absolute difference.', default_content='', solution='def diff21(n):\n  if n > 21:\n    return 2*(abs(n - 21))\n  else:\n    return abs(n-21)', difficulty=1, category='Warm-Up')

    test_diff21_1 = Test(problem=problem_diff21, call='diff21(19)', expected='2')
    test_diff21_2 = Test(problem=problem_diff21, call='diff21(30)', expected='18')
    test_diff21_3 = Test(problem=problem_diff21, call='diff21(-2)', expected='23')

    ## Problem 5 - Parrot Trouble (Warm-Up)
    problem_parrottrouble = Problem(title='Parrot Trouble', instructions='We have a loud talking parrot. The "hour" parameter is the current hour time in the range 0...23. We are in trouble if the parrot is talking and the hour is before 7 or after 20. Return True if we are in trouble.', default_content='', solution='def parrot_trouble(talking, hour):\n  if talking and (hour < 7 or hour > 20):\n    return True\n  return False', difficulty=1, category='Warm-Up')

    test_parrottrouble_1 = Test(problem=problem_parrottrouble, call='parrot_trouble(True, 6)', expected='True')
    test_parrottrouble_2 = Test(problem=problem_parrottrouble, call='parrot_trouble(False, 6)', expected='False')
    test_parrottrouble_3 = Test(problem=problem_parrottrouble, call='parrot_trouble(True, 20)', expected='False')
    test_parrottrouble_4 = Test(problem=problem_parrottrouble, call='parrot_trouble(True, 7)', expected='False')

    ## Problem 6 - Makes 10 (Warm-Up)
    problem_makes10 = Problem(title='Makes 10', instructions='Given two ints, define a function called makes10 that returns True if one of them is 10 or if their sum is equal to 10.', default_content='', solution='def makes10(num1, num2):\n  return (num1 == 10 or num2 == 10) or num1 + num2 == 10', difficulty=1, category='Warm-Up')

    test_makes10_1 = Test(problem=problem_makes10, call='makes10(9, 10)', expected='True')
    test_makes10_2 = Test(problem=problem_makes10, call='makes10(8, 3)', expected='False')
    test_makes10_3 = Test(problem=problem_makes10, call='makes10(9, 9)', expected='False')
    test_makes10_4 = Test(problem=problem_makes10, call='makes10(-10, 20)', expected='True')
    test_makes10_5 = Test(problem=problem_makes10, call='makes10(10, 3)', expected='True')

    ## Problem 7 - Near Hundred (Warm-Up)
    problem_nearhundred = Problem(title='Near Hundred', instructions='Given an int n, define a function called near_hundred that returns True if n is within 10 of 100 or 200. Hint: Math.abs(<number>) computes the absolute value of a number.', default_content='', solution='def near_hundred(n):\n  return abs(n - 100) <= 10 or abs(n-200) <= 10', difficulty=1, category='Warm-Up')

    test_nearhundred_1 = Test(problem=problem_nearhundred, call='near_hundred(93)', expected='True')
    test_nearhundred_2 = Test(problem=problem_nearhundred, call='near_hundred(89)', expected='False')
    test_nearhundred_3 = Test(problem=problem_nearhundred, call='near_hundred(90)', expected='False')
    test_nearhundred_4 = Test(problem=problem_nearhundred, call='near_hundred(190)', expected='True')
    test_nearhundred_5 = Test(problem=problem_nearhundred, call='near_hundred(210)', expected='True')
    test_nearhundred_6 = Test(problem=problem_nearhundred, call='near_hundred(0)', expected='False')

    ## Problem 8 - Find Lowest Index (Lists)
    problem_findlowestindex = Problem(title='Find Lowest Index', instructions='Define a function called find_lowest_index that returns the index of the minimum value in a given list. The input array will have at least one element in it.', default_content='', solution='def find_lowest_index(lst):\n  return lst.index(min(lst))', difficulty=1, category='Lists')

    test_findlowestindex_1 = Test(problem=problem_findlowestindex, call='find_lowest_index([99, 98, 97, 96, 95])', expected='4')
    test_findlowestindex_2 = Test(problem=problem_findlowestindex, call='find_lowest_index([2, 2, 0])', expected='2')
    test_findlowestindex_3 = Test(problem=problem_findlowestindex, call='find_lowest_index([1, 3, 5])', expected='0')
    test_findlowestindex_4 = Test(problem=problem_findlowestindex, call='find_lowest_index([0])', expected='0')

    ## Problem 9 - Count Evens (Lists)
    problem_countevens = Problem(title='Even Flow', instructions='Define a function called count_evens that takes a list and returns a count of the even numbers it contains.', default_content='', solution='def count_evens(lst):\n  return len([x for x in lst if x % 2 == 0])', difficulty=1, category='lists')

    test_countevens_1 = Test(problem=problem_countevens, call='count_evens([2, 1, 2, 3, 4])', expected='3')
    test_countevens_2 = Test(problem=problem_countevens, call='count_evens([2, 2, 0])', expected='3')
    test_countevens_3 = Test(problem=problem_countevens, call='count_evens([1, 3, 5])', expected='0')

    ## Problem 10 - Big Diff (Lists)
    problem_bigdiff = Problem(title='Big Cheese', instructions='Define a function called big_diff that takes a list of ints and returns the difference between the largest and smallest values. The list argument will contain at least one int.', default_content='', solution='def big_diff(lst):\n  return max(lst) - min(lst)', difficulty=1, category='lists')

    test_bigdiff_1 = Test(problem=problem_bigdiff, call='big_diff([10, 3, 5, 6])', expected='7')
    test_bigdiff_2 = Test(problem=problem_bigdiff, call='big_diff([7, 2, 10, 9])', expected='8')
    test_bigdiff_3 = Test(problem=problem_bigdiff, call='big_diff([5])', expected='0')
    test_bigdiff_4 = Test(problem=problem_bigdiff, call='big_diff([-5, 2, 8, 6])', expected='13')

    ## Problem 11 - Centered Average (Lists)
    problem_centeredaverage = Problem(title='Centered Average', instructions='Define a function called centered_average that returns the "centered" average of a given list of ints. The centered average, we\'ll say, is the mean average of all except the largest and smallest values. If there are multiples of the largest value, ignore only one, and likewise for the multiples of the smallest.', default_content='', solution='def big_diff(lst):\n  return max(lst) - min(lst)', difficulty=1, category='lists')

    test_centeredaverage_1 = Test(problem=problem_centeredaverage, call='centered_average([1, 2, 3, 4, 100])', expected='3')
    test_centeredaverage_2 = Test(problem=problem_centeredaverage, call='centered_average([1, 1, 5, 5, 10, 8, 7])', expected='5.2')
    test_centeredaverage_3 = Test(problem=problem_centeredaverage, call='centered_average([-10, -4, -2, -4, -2, 0])', expected='-3')

    ## Problem 12 - Sum13 (Lists)
    problem_sum13 = Problem(title='Sum 13', instructions='Define a function called sum13 that returns the sum of a given list of ints--but disregard ints with a value of 13 and ints which immediately follow them, as 13 is a very unlucky number. Return 0 if the list is empty.', default_content='', solution='def sum13(lst):\n  if not lst:\n    return 0\n  return sum([lst[i] for i in range(len(lst)) if lst[i] != 13 and (lst[i-1] != 13 or i == 0)])', difficulty=1, category='lists')

    test_sum13_1 = Test(problem=problem_sum13, call='sum13([1, 2, 2, 1])', expected='6')
    test_sum13_2 = Test(problem=problem_sum13, call='sum13([1, 2, 2, 1, 13])', expected='6')
    test_sum13_3 = Test(problem=problem_sum13, call='sum13([13, 1, 2, 13, 2, 1, 13])', expected='3')
    test_sum13_4 = Test(problem=problem_sum13, call='sum13([])', expected='0')
    test_sum13_5 = Test(problem=problem_sum13, call='sum13([13])', expected='0')
    test_sum13_5 = Test(problem=problem_sum13, call='sum13([13, 100, 0])', expected='0')

    # Attempts

    attempt1 = Attempt(user=ian, problem=problem_sleepin, saved_code='def sleep_in(wd, vac):\n  return (not wd) or vac', solved=True)
    attempt2 = Attempt(user=javier, problem=problem_sleepin, saved_code='def sleep_in(x, y):\n  return x or y', solved=False)
    attempt3 = Attempt(user=ian, problem=problem_sleepin, saved_code='def sleep_in(n):\n  pass', solved=False)

    db.session.add(ian)
    db.session.add(javier)
    db.session.add(dean)
    db.session.add(angela)
    db.session.add(soonmi)
    db.session.add(alissa)

    db.session.add(problem_sleepin)
    db.session.add(problem_sum13)
    db.session.add(problem_sumdouble)
    db.session.add(problem_parrottrouble)
    db.session.add(problem_nearhundred)
    db.session.add(problem_monkeytrouble)
    db.session.add(problem_makes10)
    db.session.add(problem_findlowestindex)
    db.session.add(problem_diff21)
    db.session.add(problem_countevens)
    db.session.add(problem_centeredaverage)
    db.session.add(problem_bigdiff)

    db.session.commit()
