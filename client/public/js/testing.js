// problem soblution, problem inputs for testing, user's solution from ace terminal

class Testing {
    constructor(problemId) {
        this.problemId = problemId;
        this.sol = '';
        this.args = {};
        this.attempt = '';

        this.getProbData();
    }

    async getProbData() {
        //send request to DB using prob's ID to get data
        //send request to DB using prob's ID to get data

        const response = await fetch(`api/problems/${this.id}`);
        const problem = await response.json();

        this.sol = problem.solution;
        this.args = problem.arguments;
    }

    setUserAttempt(attempt) {
        //get user's attempted solution from ACE terminal
        this.attempt = attempt;
    }

    runnTests() {
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


// userAttempt =
// def star_bit(string):
//     if string[0] == "-" and string[-1] == "*":
//         return string
//     if not string[0] == "-":
//         string = string[1:]
//     if not string[-1] == "*":
//         string = string[:-1]
//     return star_bit(string)

function runnTests(args, att) {
    let results = []
    for(let i =0; i < args.length; i++) {
        const attempt = pyodide.runPython(`
${att}\n
result = ${args[i].call}
result
        `)
        results.push({
            call: args[i].call,
            expected: args[i].expected,
            result: attempt,
            pass: attempt == args[i].expected,
        })
    }
    return results
}

const userAttempt = `
def double(n):
    return n*2
`

args = [
    {
        call: 'double(5)',
        expected: 10,
    },
    {
            call: 'double(10)',
        expected: 20,
    },
    {
        call: 'double(0)',
        expected: 0,
    },
    {
        call: 'double(9)',
        expected: 17
    }
]

console.log(runnTests(args, userAttempt))
