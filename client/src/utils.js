

export class pyTester {
    constructor(problem) {
        this.problemId = problem.id;
        this.sol = problem.solution;
        this.args = problem.tests;
        this.attempt = '';
    }

    setAndRun(attempt) {
        //get user's attempted solution from ACE terminal
        this.attempt = attempt;
        this.runTests();
    }

    runTests() {
        let results = []
        for(let i =0; i < this.args.length; i++) {
            const attempt = pyodide.runPython(`
${this.attempt}
result = ${this.args[i].call}
result
            `)
            results.push({
                call: this.args[i].call,
                expected: this.args[i].expected,
                result: attempt,
                pass: attempt == this.args[i].expected,
            })
        }
    return results
    }

}
