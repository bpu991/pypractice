import React, { useState } from 'react';
import { useParams, NavLink } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'

import { Typography } from '@material-ui/core';


const tempActiveProblem = {
    id: 3,
    title: "Sum Thirteen",
    instructions: `Return the sum of the numbers in the array, returning 0 for an empty array. Except the number 13 is very unlucky, so it does not count and numbers that come immediately after a 13 also do not count."`,
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
    const [listOpen, setListOpen] = useState(false)

    // get the active problem from state
    // dispatch thunk to obtain the problem with the id fr

    return (
        <>
        <Typography>{tempActiveProblem.title}</Typography>
          <Button onClick={()=>setListOpen(true)}>Problem List</Button>
          <Drawer anchor="left" open={listOpen} onClose={()=>setListOpen(false)}>
          <List>
        {tempProblems.map((problem, ind) => (
          <ListItem
            component={NavLink}
            to={`/problems/${problem.id}`}
            key={problem.id}
            onClick={()=>setListOpen(false)}>
              {`${ind+1}. ${problem.title}`}
          </ListItem>
        ))}
      </List>
          </Drawer >
          </>
    )
}


export default ProblemPage;
