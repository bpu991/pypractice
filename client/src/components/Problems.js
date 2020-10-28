import React, {useEffect} from 'react';
import { useHistory } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import Typography from '@material-ui/core/Typography'
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import CheckCircle from '@material-ui/icons/CheckCircle'
import Container from '@material-ui/core/Container'
import { green } from '@material-ui/core/colors';

import { loadProblemsThunk } from '../actions/problems';

const tempProblems = [{
    id: 1,
    title: "Hello World",
    instructions: `Define a function hello_world that prints out "Hello World"`,
    default_content: "def hello_world():",
    solution: `def hello_world():
        print("Hello World")`,
    tests: `tests here idk`,
    difficulty: 1,
    solved: true, // this may be in a different part of state
}, {
    id: 2,
    title: "Monkey Trouble",
    instructions: `We have two monkeys, a and b, and the parameters a_smile and b_smile indicate if each is smiling. We are in trouble if they are both smiling or if neither of them is smiling. Return True if we are in trouble."`,
    default_content: "def monkey_trouble(a_smile, b_smile):",
    solution: `def monkey_trouble(a_smile, b_smile):
        return (a_smile==b_smile)`,
    tests: `tests here idk`,
    difficulty: 1,
    solved: false, // this may be in a different part of state
}, {
    id: 3,
    title: "Sum Thirteen",
    instructions: `Return the sum of the numbers in the array, returning 0 for an empty array. Except the number 13 is very unlucky, so it does not count and numbers that come immediately after a 13 also do not count."`,
    default_content: "def sum13(nums):",
    solution: `def sum13(nums):
    return sum(x for prev, x in zip([0]+nums, nums) if 13 not in (prev,x))`,
    tests: `tests here idk`,
    difficulty: 2,
    solved: false, // this may be in a different part of state
}]
const Problems = () => {
    const history = useHistory();
    const dispatch = useDispatch();
    const difficulties = {
        "1": "Easy",
        "2": "Intermediate",
        "3": "Difficult"
    }

    const problems = useSelector(state=>Object.values(state.entities.problems.byId))

    useEffect(()=> {
        // load problems once that is present
        dispatch(loadProblemsThunk())
    }, [])

    const goToProblem = (id) => {
        history.push(`/problems/${id}`)
    }

    return (
        <>
            <Container maxWidth="md">
                <div style={{ paddingTop: 50, paddingBottom: 50 }}>
                    <Typography variant="h3" gutterBottom paragraph>All coding problems</Typography>
                    <Typography variant="h5" color="textSecondary" gutterBottom paragraph>
                        Work your way through all {tempProblems.length} problems to become a python master!
                    </Typography>
                </div>
                <TableContainer component={Paper} elevation={0} >
                    <Table>
                        <TableBody>
                            {tempProblems.map((problem, ind) => (
                                <TableRow key={problem.id} hover onClick={() => goToProblem(problem.id)}>
                                    <TableCell padding="none">{ind + 1}</TableCell>
                                    <TableCell>{problem.title}</TableCell>
                                    <TableCell>{difficulties[problem.difficulty]}</TableCell>
                                    <TableCell padding="none">{(problem.solved) ? <CheckCircle style={{ color: green[300] }} /> : <div />}</TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>
        </>
    )
}

export default Problems;
