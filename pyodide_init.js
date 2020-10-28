pyodide.runPython(`
import io, code, sys
from js import pyodide

class Console(code.InteractiveConsole):
    def runcode(self, code):
        sys.stdout = io.StringIO()
        sys.stderr = io.StringIO()
_c = Console(locals=globals())
`)


// var c = pyodide.pyimport('_c')
// c.push('init')


// sys.stdout.close()
// sys.stdout.__init__()

// def doubler(num):
//     return 2*num

// print(doubler)

// sys.stdout.getvalue()
// sys.stderr.getvalue()
