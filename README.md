# Welcome to pyPractice!
**An app for practicing and building Python fundamentals. Made by:**
- Andrew Travers
- Ben Pu
- Jony Almeida
- Juliet Shafto
# App Description
-   pyPractice offers a collection of practice problems with String, Arrays, Recursion, Dictionaries and Logic.
-   The app offers a Python "repl" that allows users to code solutions for the given problems and a testing suit feature that checks their results against the correct answers.
# User Stories
-   As a user of pyPractice, I would like to practice the fundamentals of Python and build my skills as a Python coder.
-   As a user of pyPractice, I would like to be able to create a user and save my progress and coded solutions.
-   As a user of pyPractice, I would like to have an easy to use and interactive tool for practicing Python.
# Technologies
-   Frontend UI engine: React with Redux
-   Backend server: Python Flask
-   RDBMS: PostgresSQL v12
-   ORM: SQLAlchemy 
# Deployment
## Heroku deployment with Docker container
# Define Database Functionality + Input Data
1.  Store user information.
2.  Store problems.
3.  Store user's solutions attempts.
# Define Models
**User**
-   username => string (40) / not null / unique
-   email => string (255) / not null / unique
-   hashed_password => binary string
-   userGeocode => string (128) / not null

**Problems**
-   title => string / not null
-   instructions => string / not null  
-   default-content => string / not null
-   solution => string / not null
-   difficulty => integer / not null
-   categories => string

**Attempts**
-   user_id => integer / not null
-   problem_id => integer / not null
-   saved code => string
-   solved => boolean

# Define Database Relations
## Attempts and Users
	 
# Seeding the Database
-   Manual compilation of problems data

# APIs CRUD Operations
- /user/
- /user/login
- /message/list
- /message/send
# UI Layout
-
# Tools
-   VS Code
-   Docker
-   Firefox, Chrome
-   GitHub
-   Coffee


# Idea 1: code challenge
## "basic coding challenges/(racing?)"
- (library for react code components: https://github.com/securingsincity/react-ace)
- User account and info
- Interactive code repl
  - (clock?)
  - button for running code
    - shows simple console output
  - button for running tests (submit?)
    - shows test output
    - should this automatically save the code?
  - reset button?
  - save progress button
- Coding Problems
- Tests for the problems
- Solutions for problems
- Your own solution for a given problem
- Dashboard with problems you’ve attempted
- time to solve/score
- bonus: profile page with stats/progress
- bonus: discussion/comments on coding problems
- bonus: timed challenge mode

## database schema
preliminary mockup:
https://dbdiagram.io/d/5f9203b03a78976d7b78d180

- users
  - username
  - email
  - password
- problems
  - name
  - instructions
  - solution
  - initial code
  - tests
- attempts
  - userId
  - problemId
  - saved code string
  - solved
- comments (stretch goal)
  - userId
  - problemId
  - timestamp
  - text

## names
- pypractice
- pylearn
- pyracer


## relevant links
-- pyodide for running
https://pyodide-cdn2.iodide.io/v0.15.0/full/console.html
https://github.com/iodide-project/pyodide
https://readthedocs.org/projects/pyodide/downloads/pdf/latest/

