import React, { useState, useEffect } from "react";

function PythonTerminal(props) {
  useEffect(() => {
    const script1 = document.createElement("script");
    script1.src = "https://pyodide-cdn2.iodide.io/v0.15.0/full/";

    const script2 = document.createElement("script");
    script2.src = "https://pyodide-cdn2.iodide.io/v0.15.0/full/pyodide.js";

    document.body.appendChild(script1);
    document.body.appendChild(script2);

    // return () => {
    //   document.body.removeChild(script);
    // };
  }, []);

  return (
    <>
      <h1>Python stuff: </h1>
    </>
  );
}

export default PythonTerminal;
