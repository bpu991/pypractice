import React, { useEffect } from "react";

import "./PythonTerminal.css";

export default function PythonTerminal() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "/js/python-repl.js";
    document.body.append(script);
  });

  function handleClick() {
    const script2 = document.createElement("script");
    script2.innerText = `
var code = acer.getValue();
console.log(code); 
var py = pyodide.runPython;
console.log(py("2+2"));

var a = py("'Hello Py'");

var display = document.querySelector("#display");
display.innerHTML = a;

var b = py(code);
display.innerHTML = b;
    
    `;
    document.body.append(script2);

    return () => document.body.remove(script2);
  }

  return (
    <>
      <h1>Python stuff: </h1>
      <h2>Recursion-1 --</h2>
      <p>
        <strong>StarBit</strong> **This question is modified from parenBit on
        CodingBat to starBit.
      </p>
      <p>
        Given a string that contains a dash and a star, compute recursively a
        new string made of only of the dash and star and their contents, so
        "xyz-abc*123" yields "-abc*".
      </p>
      <p style={{ backgroundColor: "lightgray", fontWeight: "bold" }}>
        Examples:
        <br />
        starBit('xyz,-abc*123') → -abc* starBit('x,-hello*') → -hello*
        starBit(',-xy*1') → -xy*
      </p>
      <p>Result:</p>
      <div id='display'></div>
      <button onClick={handleClick}>Click</button>
    </>
  );
}

// def hello():
//     s=''
//     a=['h','i']
//     for char in a:
//         s += char
//     return s
// b = hello()
// b

// def star_bit(string):
//     if string[0] == "-" and string[-1] == "*":
//         return string
//     if not string[0] == "-":
//         string = string[1:]
//     if not string[-1] == "*":
//         string = string[:-1]
//     return star_bit(string)

// result = star_bit(xyz,-abc*123)
// result
