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

export default function ResultsTable() {
  const results = useSelector((state) => state.tests.results);

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
}
