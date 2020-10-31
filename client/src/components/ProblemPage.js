import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams, NavLink } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Drawer from "@material-ui/core/Drawer";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Container from "@material-ui/core/Container";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import Grid from "@material-ui/core/Grid"
import NavigateNext from "@material-ui/icons/NavigateNext";
import NavigateBefore from "@material-ui/icons/NavigateBefore";
import IconButton from "@material-ui/core/IconButton";
import CheckCircle from "@material-ui/icons/CheckCircle";
import { green } from "@material-ui/core/colors";


import {
    loadProblemsThunk,
    loadProblemDetailsThunk,
} from "../actions/problem_actions";
import SvgLogo from "./SvgLogo";
import InteractiveTerminal from "./InteractiveTerminal";
import ResultTable from "./ResultsTable";

const ProblemPage = () => {
    const { problemId } = useParams();
    const dispatch = useDispatch();
    const [listOpen, setListOpen] = useState(false);

    const problems = useSelector((state) =>
        Object.values(state.entities.problems.byId)
    );
    const activeProblem = useSelector(
        (state) => state.entities.problems.activeProblem
    );

    useEffect(() => {
        dispatch(loadProblemsThunk());
        dispatch(loadProblemDetailsThunk(problemId));
    }, [problemId]);

    // get the active problem from state
    // dispatch thunk to obtain the problem with the id from params
    const last = (id) => {
        const max = Math.max(...problems.map((prob) => prob.id));
        return parseInt(id) >= max;
    };

    const first = (id) => {
        const min = Math.min(...problems.map((prob) => prob.id));
        return parseInt(id) <= min;
    };

    const difficulties = {
        1: "Easy",
        2: "Intermediate",
        3: "Difficult",
    };

    return (
        <>
            <Toolbar>
                <IconButton
                    component={NavLink}
                    to={`/problems/${parseInt(problemId) - 1}`}
                    disabled={first(problemId)}>
                    <NavigateBefore />
                </IconButton>
                <Container style={{ flexGrow: 1 }} align='center'>
                    <Button onClick={() => setListOpen(true)}>Select problem</Button>
                </Container>
                <IconButton
                    component={NavLink}
                    to={`/problems/${parseInt(problemId) + 1}`}
                    disabled={last(problemId)}>
                    <NavigateNext />
                </IconButton>
            </Toolbar>
            <Container maxWidth='md'>
                <div>
                    <Grid container alignItems="center">
                    <Typography component="span" variant='h6'>
                        {activeProblem.title}
                    </Typography>
                    {activeProblem.solved ? (
                      <CheckCircle style={{ color: green[300], marginLeft:10 }} />
                    ) : (
                      null
                    )}
                    </Grid>
                    <Typography variant='subtitle1' gutterBottom paragraph>
                        {difficulties[activeProblem.difficulty]}
                    </Typography>
                    <Typography
                        variant='body1'
                        color='textSecondary'
                        gutterBottom
                        paragraph>
                        {activeProblem.instructions}
                    </Typography>
                    <InteractiveTerminal />
                </div>

                <Drawer
                    anchor='left'
                    open={listOpen}
                    onClose={() => setListOpen(false)}>
                    <div style={{marginTop:50}}/>
                    <div style={{margin:"0 auto"}}>
                        <IconButton component={NavLink} to='/'>
                            <SvgLogo />
                        </IconButton>
                    </div>
                    <Button component={NavLink} to={"/problems"} style={{ margin: 25 }}>
                        View all Problems{" "}
                    </Button>
                    <List>
                        {problems.map((problem, ind) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={`/problems/${problem.id}`}
                                key={problem.id}
                                onClick={() => setListOpen(false)}
                                selected={parseInt(problemId) === problem.id}>
                                <Typography color='textPrimary'>
                                    {`${ind + 1}. ${problem.title}`}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Drawer>
            </Container>
            {/* <ResultTable /> */}
        </>
    );
};

export default ProblemPage;
