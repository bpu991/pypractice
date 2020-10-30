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
    this.runTests();
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

export function stdWrapper(code) {
  return `
sys.stdout.__init__()

${code}

sys.stdout.getvalue()
`
}

export function ioInit(py) {
  py(`
import io, code, sys
from js import pyodide

class Console(code.InteractiveConsole):
    def runcode(self, code):
        sys.stdout = io.StringIO()
        sys.stderr = io.StringIO()
_c = Console(locals=globals())`
  )
}
