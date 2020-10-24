import React, { useState, useEffect, createElement } from "react";

export default function PythonTerminal() {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://pyodide-cdn2.iodide.io/v0.15.0/full/";

    const script2 = document.createElement("script");
    script2.src = "https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js";

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    return () => {
      document.body.removeChild(script1);
      document.body.removeChild(script2);
    };
  }, []);

  const handleClick = () => {
    let pythonCode = `
      return "say hello"
    `;
    const script = document.createElement("script");
    script.innerText = `console.log(pyodide.runPython(${pythonCode}));`;
    document.body.appendChild(script);
    document.body.removeChild(script);
  };

  return (
    <>
      <h1>Python stuff: </h1>
      <button type='button' onClick={handleClick}>
        Click
      </button>
    </>
  );
}
