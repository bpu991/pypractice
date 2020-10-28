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

      py(`
import io, code, sys
from js import pyodide

class Console(code.InteractiveConsole):
    def runcode(self, code):
        sys.stdout = io.StringIO()
        sys.stderr = io.StringIO()
_c = Console(locals=globals())`
      )

      var c = window.pyodide.pyimport('_c')
      c.push('')

      setTestSuit(new pyTester(activeProblem, py))
    }
  }, [window.pyodide])

  function stdWrapper(code) {
    return `
sys.stdout.__init__()

${code}

sys.stdout.getvalue()
`
  }

  function handleClickRunCode() {
    const py = window.pyodide.runPython;
    let evaluatedCode;

    try {
        evaluatedCode = py(stdWrapper(userCode));
    } catch(err) {
        console.log(err)
    }

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
        <Grid item xs={12} sm={8} md={8}>
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
        <Grid item xs={12} sm={4}>
          <Card variant='outlined'>
            <CardHeader>Output:</CardHeader>
            <Typography style={{ fontFamily: "monospace", fontSize: "1.5rem" }}>
              {evalResult}
            </Typography>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default InteractiveTerminal;
