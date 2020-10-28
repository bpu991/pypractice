import React, { useState } from "react";
import AceEditor from "react-ace";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";

export default function PythonTerminal({ problemId }) {
  const [userCode, setUserCode] = useState("");
  const updateUserCode = (value) => {
    setUserCode(value);
  };

  function handleClick() {
    var py = window.pyodide.runPython;

    var evaluatedCode = py(userCode);

    var display = document.querySelector("#display");

    display.innerHTML = evaluatedCode;
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
      <AceEditor
        maxLines={Infinity}
        theme='tomorrow_night_blue'
        fontSize='100%'
        showPrintMargin={true}
        minLines={20}
        mode='python'
        selectionStyle='text'
        autoScrollEditorIntoView='true'
        animatedScroll='true'
        onChange={updateUserCode}
        setOptions={{
          enableBasicAutocompletion: true,
          enableLiveAutocompletion: true,
        }}
      />
      <p>Result:</p>
      <div id='display'></div>
      <button onClick={handleClick}>Click</button>
    </>
  );
}
