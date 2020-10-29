import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableHead from "@material-ui/core/TableHead";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableRow from "@material-ui/core/TableRow";
import CheckIcon from "@material-ui/icons/Check";
import CloseIcon from "@material-ui/icons/Close";

// import pyTester from "../utils";
// import { runTestsThunk } from "../actions/tests_actions";

export const ResultsTable = () => {
  //   const dispatch = useDispatch();

  //   setTimeout(() => {
  //     const py = window.pyodide.runPython;

  //     const prob = new pyTester(
  //       {
  //         id: 2,
  //         title: "Monkey Trouble",
  //         instructions: `We have two monkeys, a and b, and the parameters a_smile and b_smile indicate if each is smiling. We are in trouble if they are both smiling or if neither of them is smiling. Return True if we are in trouble."`,
  //         default_content: "def monkey_trouble(a_smile, b_smile):",
  //         solution: `def monkey_trouble(a_smile, b_smile):
  //         return (a_smile==b_smile)`,
  //         tests: [
  //           {
  //             call: "monkey_trouble(True, False)",
  //             expected: "True",
  //           },
  //         ],

  //         difficulty: 1,
  //         solved: false, // this may be in a different part of state
  //       },
  //       py
  //     );
  //     console.log(prob);
  //     prob.attempt = `
  // def monkey_trouble(a_smile, b_smile):
  //     return (a_smile==b_smile)
  //     `;

  //     dispatch(runTestsThunk(prob, prob.attempt));
  //   }, 5000);
  //   //doesn't return a table if results is empty
  //   var results = useSelector((state) => state.entities.results.results);
  //   console.log(results);

  const results = [
    {
      pass: true,
      expected: 18,
      result: 18,
      call: "sum_2(4)",
    },
    {
      pass: true,
      expected: 218,
      result: 218,
      call: "sum_2(32)",
    },
    {
      pass: false,
      expected: 128,
      result: 118,
      call: "sum_2(124)",
    },
    {
      pass: true,
      expected: 18,
      result: 18,
      call: "sum_2(4)",
    },
    {
      pass: true,
      expected: 218,
      result: 218,
      call: "sum_2(32)",
    },
    {
      pass: false,
      expected: 128,
      result: 118,
      call: "sum_2(124)",
    },
    {
      pass: true,
      expected: 18,
      result: 18,
      call: "sum_2(4)",
    },
    {
      pass: true,
      expected: 218,
      result: 218,
      call: "sum_2(32)",
    },
    {
      pass: false,
      expected: 128,
      result: 118,
      call: "sum_2(124)",
    },
  ];

  if (!results) return null;

  return (
    <>
      <TableContainer
        style={{ border: "3px solid limegreen", maxWidth: "500px" }}>
        <Table style={{ textAlign: "center" }}>
          <TableHead>
            <TableRow>
              <TableCell>Pass</TableCell>
              <TableCell>Function call</TableCell>
              <TableCell>Expected</TableCell>
              <TableCell>Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, i) => {
              return (
                <>
                  <TableRow key={i}>
                    <TableCell style={{ textAlign: "center" }}>
                      {result.pass ? (
                        <CheckIcon style={{ color: "limegreen" }} />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {result.call}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {result.expected}
                    </TableCell>
                    <TableCell style={{ textAlign: "center" }}>
                      {result.result}
                    </TableCell>
                  </TableRow>
                </>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
};
