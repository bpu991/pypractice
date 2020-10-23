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

