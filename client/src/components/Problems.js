import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import Typography from "@material-ui/core/Typography";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import CheckCircle from "@material-ui/icons/CheckCircle";
import Container from "@material-ui/core/Container";
import { green } from "@material-ui/core/colors";

import { loadProblemsThunk } from "../actions/problem_actions";

const Problems = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const difficulties = {
    1: "Easy",
    2: "Intermediate",
    3: "Difficult",
  };

  const problems = useSelector((state) =>
    Object.values(state.entities.problems.byId)
  );

  useEffect(() => {
    // load problems once that is present
    dispatch(loadProblemsThunk());
  }, []);

  const goToProblem = (id) => {
    history.push(`/problems/${id}`);
  };

  return (
    <>
      <Container maxWidth='md'>
        <div style={{ paddingTop: 50, paddingBottom: 50 }}>
          <Typography variant='h3' gutterBottom paragraph>
            All coding problems
          </Typography>
          <Typography variant='h5' color='textSecondary' gutterBottom paragraph>
            Work your way through all {problems.length} problems to become a
            python master!
          </Typography>
        </div>
        <TableContainer component={Paper} elevation={0}>
          <Table>
            <TableBody>
              {problems.map((problem, ind) => (
                <TableRow
                  key={problem.id}
                  hover
                  onClick={() => goToProblem(problem.id)}>
                  <TableCell padding='none'>{ind + 1}</TableCell>
                  <TableCell>{problem.title}</TableCell>
                  <TableCell>{problem.category}</TableCell>
                  <TableCell>{difficulties[problem.difficulty]}</TableCell>
                  <TableCell padding='none'>
                    {problem.solved ? (
                      <CheckCircle style={{ color: green[300] }} />
                    ) : (
                      <div />
                    )}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default Problems;
