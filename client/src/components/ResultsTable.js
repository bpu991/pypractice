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

import {clearResults} from "../actions/tests_actions"

export default function ResultsTable() {
  const results = useSelector((state) => state.entities.results.results);
  const activeProblem = useSelector((state) => state.entities.problems.activeProblem)
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(clearResults())
  }, [activeProblem.id])

  if (!results) return null;

  return (
    <>
      <TableContainer>
        <Table size="small">
          <TableHead>
            <TableRow>
              <TableCell padding="checkbox"></TableCell>
              <TableCell style={{paddingLeft:3, paddingRight:3}}>Function call</TableCell>
              <TableCell >Expected</TableCell>
              <TableCell >Result</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {results.map((result, i) => {
              return (
                // <div >
                  <TableRow key={i}>
                    <TableCell style={{ textAlign: "center", paddingLeft:3, paddingRight:3}}>
                      {result.pass ? (
                        <CheckIcon style={{ color: "limegreen" }} />
                      ) : (
                        <CloseIcon style={{ color: "red" }} />
                      )}
                    </TableCell>
                    <TableCell padding="none"style={{ fontFamily: "monospace" }}>
                      {result.call}
                    </TableCell>
                    <TableCell style={{ fontFamily: "monospace" }}>
                      {result.expected}
                    </TableCell>
                    <TableCell style={{ fontFamily: "monospace" }}>
                      {result.result}
                    </TableCell>
                  </TableRow>
                // </div>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
