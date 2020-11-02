import React, { useEffect, useState, getState } from "react";
import { useSelector, useDispatch } from "react-redux";
import AceEditor from "react-ace";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import PlayArrow from "@material-ui/icons/PlayArrow";
import Paper from "@material-ui/core/Paper";
import DoneAll from "@material-ui/icons/DoneAll";
import Save from "@material-ui/icons/Save"
import Grid from "@material-ui/core/Grid";
import Container from "@material-ui/core/Container";
import Hidden from "@material-ui/core/Hidden";
import { green, red, yellow } from "@material-ui/core/colors";
import { makeStyles } from "@material-ui/styles";
import Card from "@material-ui/core/Card";

import "ace-builds/src-noconflict/mode-python";
import "ace-builds/src-noconflict/theme-tomorrow_night_blue";

import { pyTester, stdIOWrapper } from "../utils";
import { runTests } from "../actions/tests_actions";
import { saveCodeThunk } from "../actions/problem_actions";
import ResultsTable from './ResultsTable'

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
    saveButton: {
        color: theme.palette.getContrastText(red[400]),
        backgroundColor: yellow[800],
        "&:hover": {
            backgroundColor: yellow[900],
        },
    }
}));

const InteractiveTerminal = () => {
    const defaultContent = useSelector((state) => state.entities.problems.activeProblem.default_content)
    const activeProblem = useSelector((state) => state.entities.problems.activeProblem);
    const loggedOut = useSelector((state) => !state.authentication.user);
    const user = useSelector((state) => state.authentication.user);
    const classes = useStyles();
    const [userCode, setUserCode] = useState("");
    const [evalResult, setEvalResult] = useState("");
    const dispatch = useDispatch();
    const [testSuit, setTestSuit] = useState();



    useEffect(() => {
        if (window.pyodide) {
            const py = window.pyodide.runPython;
            setTestSuit(new pyTester(activeProblem, py));
        }
        if (activeProblem.attempts) {
            if (activeProblem.attempts.length) {
                const newUserAttempt = activeProblem.attempts[activeProblem.attempts.length - 1].saved_code
                setUserCode(newUserAttempt);
                setEvalResult("");
                return;
            }
            setUserCode(defaultContent);
            setEvalResult("");
        }
    }, [window.pyodide, activeProblem]);

    function handleClickRunCode() {
        const py = window.pyodide.runPython;
        let evaluatedCode;

        try {
            evaluatedCode = py(stdIOWrapper(userCode));
        } catch (err) {
            console.log(err);
            evaluatedCode = "No output"
        }

        setEvalResult(evaluatedCode);
    }

    function handleClickRunTests() {
        let results;
        try {
            results = testSuit.setAndRun(userCode);
            if (results &&
                results.reduce((acc, res) => acc && res.pass) &&
                !loggedOut) {
                const userId = user.id;
                const probId = activeProblem.id;
                dispatch(saveCodeThunk(userCode, userId, probId, true));
            }
            dispatch(runTests(results));
        } catch (err) {
            console.log(err)
        }
    }

    function handleClickSaveCode() {
        const userId = user.id;
        const probId = activeProblem.id;
        const solved = activeProblem.solved
        dispatch(saveCodeThunk(userCode, userId, probId, solved));
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
                            {(loggedOut) ? (
                                null
                            ) : (
                                    <Grid item>
                                        <Button
                                            className={classes.saveButton}
                                            onClick={handleClickSaveCode}
                                            variant='contained'>
                                            <Hidden xsDown>{`Save Code`}</Hidden>
                                            <Save style={{ marginLeft: 5 }} />
                                        </Button>
                                    </Grid>
                                )}
                            <Grid item>
                                <Button
                                    className={classes.testButton}
                                    onClick={handleClickRunTests}
                                    variant='contained'>
                                    <Hidden xsDown>{`Run Tests`}</Hidden>
                                    <DoneAll style={{ marginLeft: 5 }} />
                                </Button>

                            </Grid>
                        </Toolbar>
                        <Container disableGutters>
                            <AceEditor
                                id='editor'
                                maxLines={Infinity}
                                theme='tomorrow_night_blue'
                                fontSize='100%'
                                showPrintMargin={true}
                                minLines={20}
                                mode='python'
                                selectionStyle='text'
                                autoScrollEditorIntoView='true'
                                animatedScroll='true'
                                value={userCode}
                                onChange={setUserCode}
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
                    <Card variant='outlined' style={{ minHeight: 50 }}>
                        <Typography style={{ padding: 5 }} gutterBottom variant="body1">Output:</Typography>
                        <Typography style={{ padding: 5, fontFamily: "monospace", fontSize: "1.5rem" }}>
                            {evalResult}
                        </Typography>
                    </Card>
                    <Card variant='outlined' style={{ minHeight: 50, marginTop: 25 }}>
                        <Typography style={{ padding: 5 }} variant="body1">Test Results:</Typography>
                        <ResultsTable />
                    </Card>
                </Grid>

            </Grid>
        </>
    );
};


export default InteractiveTerminal;
