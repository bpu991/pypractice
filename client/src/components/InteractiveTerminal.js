import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AceEditor from "react-ace";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Paper from "@material-ui/core/Paper";
import DoneAll from "@material-ui/icons/DoneAll";
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import { green, red } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";

import "ace-builds/src-min-noconflict/ext-searchbox";
import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";

import pyTester from "../utils";
import ResultsTable from "./ResultsTable";
import { runTestsThunk } from "../actions/tests_actions";

const useStyles = makeStyles((theme) => ({
  runButton: {
    color: theme.palette.getContrastText(green[600]),
    backgroundColor: green[600],
    "&:hover": {
      backgroundColor: green[800],
    },
  },
  testButton: {
    color: theme.palette.getContrastText(red[400]),
    backgroundColor: red[600],
    "&:hover": {
      backgroundColor: red[800],
    },
  },
}));


const InteractiveTerminal = () => {
  const classes = useStyles();
  const [userCode, setUserCode] = useState("");
  const [evalResult, setEvalResult] = useState("");
  const updateUserCode = (value) => {
    setUserCode(value);
  };
  const dispatch = useDispatch();
  const  activeProblem = useSelector((state) => state.entities.problems.activeProblem)
  const [testSuit, setTestSuit] = useState()

  useEffect(() => {
      if (window.pyodide) {
          const py = window.pyodide.runPython
          setTestSuit(new pyTester(activeProblem, py))
      }
  }, [window.pyodide, activeProblem])

  function handleClickRunCode() {
    const py = window.pyodide.runPython;

    const evaluatedCode = py(userCode);

    setEvalResult(evaluatedCode);
  }

  function handleClickRunTests() {
    testSuit.attempt = userCode;
    const results = testSuit.runTests();
    console.log(results);
    dispatch(runTestsThunk(results));
  }

  return (
    <>
      <Grid container spacing={3}>
        <Grid item xs={12} md={7}>
          <Paper variant='outlined'>
            <Toolbar
              style={{ padding: 15 }}
              component={Grid}
              justify='flex-end'
              spacing={3}
              container>
              <Grid item>
                <Button
                  className={classes.runButton}
                  onClick={handleClickRunCode}
                  variant='contained'>
                  <Hidden xsDown>{`Run Code`}</Hidden>
                  <PlayArrow />
                </Button>
              </Grid>
              <Grid item>
                <Button
                  className={classes.testButton}
                  onClick={handleClickRunTests}
                  color='secondary'
                  variant='contained'>
                  <Hidden xsDown>{`Run Tests`}</Hidden>
                  <DoneAll style={{ marginLeft: 5 }} />
                </Button>
              </Grid>
            </Toolbar>
            <Container disableGutters>
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
                width='100%'
                setOptions={{
                  enableBasicAutocompletion: true,
                  enableLiveAutocompletion: true,
                }}
              />
            </Container>
          </Paper>
        </Grid>
        <Grid item xs={12} md={5}>
          <Card variant='outlined' style={{minHeight:50}}>
            <Typography style={{padding:5}} gutterBottom variant="body1">Output:</Typography>
            <Typography style={{ padding:5, fontFamily: "monospace", fontSize: "1.5rem" }}>
              {evalResult}
            </Typography>
          </Card>
          <Card variant='outlined' style={{minHeight:50, marginTop:25}}>
            <Typography style={{padding:5}}  variant="body1">Test Results:</Typography>
            <ResultsTable/>
        </Card>
        </Grid>

      </Grid>
    </>
  );
};

export default InteractiveTerminal;
