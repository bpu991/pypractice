import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux'
import { useParams, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import Container from '@material-ui/core/Container'
import Typography from '@material-ui/core/Typography';
import Toolbar from '@material-ui/core/Toolbar';
import NavigateNext from '@material-ui/icons/NavigateNext';
import NavigateBefore from '@material-ui/icons/NavigateBefore';
import IconButton from '@material-ui/core/IconButton';

import { loadProblemsThunk, loadProblemDetailsThunk } from '../actions/problem_actions';
import SvgLogo from './SvgLogo'
import InteractiveTerminal from './InteractiveTerminal'

const tempActiveProblem = {
    id: 3,
    title: "Sum Thirteen",
    instructions: `Return the sum of the numbers in the array, returning 0 for an empty array. Except the number 13 is very unlucky, so it does not count and numbers that come immediately after a 13 also do not count.`,
    default_content: "def sum13(nums):",
    solution: `def sum13(nums):\n\n
    return sum(x for prev, x in zip([0]+nums, nums) if 13 not in (prev,x))`,
    tests: `tests here idk`,
    difficulty: 2,
    solved: false, // this may be in a different part of state
}
const tempProblems = [{
    id: 1,
    title: "Hello World",
    difficulty: 1,
    solved: true, // this may be in a different part of state
}, {
    id: 2,
    title: "Monkey Trouble",
    difficulty: 1,
    solved: false, // this may be in a different part of state
}, {
    id: 3,
    title: "Sum Thirteen",
    difficulty: 2,
    solved: false, // this may be in a different part of state
}]




const ProblemPage = () => {
    const { problemId } = useParams();
    const dispatch = useDispatch()
    const [listOpen, setListOpen] = useState(false)

    const problems = useSelector(state => state.entities.problems.byId);
    const activeProblem = useSelector(state => state.entities.problems.activeProblem)

    useEffect(() => {
        dispatch(loadProblemsThunk())
        dispatch(loadProblemDetailsThunk(problemId))
    }, [problemId])


    // get the active problem from state
    // dispatch thunk to obtain the problem with the id from params
    const last = (id) => {
        const max = Math.max(...tempProblems.map(prob => prob.id))
        return (parseInt(id) >= max)
    }

    const first = (id) => {
        const min = Math.min(...tempProblems.map(prob => prob.id))
        return (parseInt(id) <= min)
    }



    const difficulties = {
        "1": "Easy",
        "2": "Intermediate",
        "3": "Difficult"
    }

    return (
        <>
            <Toolbar>
                <IconButton
                    component={NavLink}
                    to={`/problems/${parseInt(problemId) - 1}`}
                    disabled={first(problemId)}>
                    <NavigateBefore />
                </IconButton>
                <Container style={{ flexGrow: 1 }} align="center">
                    <Button onClick={() => setListOpen(true)}>Select problem</Button>
                </Container>
                <IconButton
                    component={NavLink}
                    to={`/problems/${parseInt(problemId) + 1}`}
                    disabled={last(problemId)}>
                    <NavigateNext />
                </IconButton>
            </Toolbar>
            <Container maxWidth="md">
                <div>
                    <Typography variant="h6" paragraph>{tempActiveProblem.title}</Typography>
                    <Typography variant="subtitle1" gutterBottom paragraph>{difficulties[tempActiveProblem.difficulty]}</Typography>
                    <Typography variant="body1" color="textSecondary" gutterBottom paragraph>
                        {tempActiveProblem.instructions}
                    </Typography>
                    <InteractiveTerminal/>
                </div>

                <Drawer anchor="left" open={listOpen} onClose={() => setListOpen(false)}>
                    <IconButton component={NavLink} to="/">
                        <SvgLogo />
                    </IconButton>
                    <Button component={NavLink} to={'/problems'} style={{ margin: 25 }}>View all Problems </Button>
                    <List>
                        {tempProblems.map((problem, ind) => (
                            <ListItem
                                button
                                component={NavLink}
                                to={`/problems/${problem.id}`}
                                key={problem.id}
                                onClick={() => setListOpen(false)}
                                selected={parseInt(problemId) === problem.id}>
                                <Typography color="textPrimary">
                                    {`${ind + 1}. ${problem.title}`}
                                </Typography>
                            </ListItem>
                        ))}
                    </List>
                </Drawer >
            </Container>
        </>
    )
}


export default ProblemPage;
