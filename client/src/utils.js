export class pyTester {
  constructor(problem, py) {
    this.problemId = problem.id;
    this.sol = problem.solution;
    this.args = problem.tests;
    this.attempt = "";

    this.py = py;
  }

  setAndRun(attempt) {
    //get user's attempted solution from ACE terminal
    this.attempt = attempt;
    return this.runTests();
  }

  runTests() {
    console.log(this.args);
    if (this.attempt === "" || this.args.length === 0) {
      return;
    }
    let results = [];
    for (let i = 0; i < this.args.length; i++) {
      let attempt = this.py(`
${this.attempt}
result = ${this.args[i].call}
result
            `);
      attempt =
        typeof attempt === "boolean" ? (attempt ? "True" : "False") : attempt;
      console.log(attempt);
      results.push({
        call: this.args[i].call,
        expected: this.args[i].expected,
        result: attempt,
        pass: attempt == this.args[i].expected,
      });
    }
    return results;
  }
}


export function stdIOWrapper(code) {
  code = code.split('\n')
  for(let i = 1; i < code.length; i++) {
    code[i] = code[i] === '' ? '' : '  ' + code[i]
  }
  code = code.join('\n')
  code = `
import sys, io
sys.stdout = io.StringIO()
sys.stdout.__init__()
try:
  ${code}
except:
  print(sys.exc_info())
sys.stdout.getvalue()
  `
  return code
}
