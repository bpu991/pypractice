import React from 'react';
import {useSelector} from 'react-redux';
import { NavLink } from "react-router-dom";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

import UsersProblems from './UsersProblems'

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

const Dashboard = () => {
    const profile = useSelector(state => state.authentication.user);
    const classes = useStyles();

    return (
        <div style={{ textAlign: 'center' }}>
            <h1>Welcome {profile.username}!</h1>
            <h3>Those problems aren't gonna solve themselves...</h3>
            <div className={classes.root}>
                <Button component={NavLink} to='/problems' variant="contained">Start Coding!</Button>
            </div>
            <UsersProblems/>
        </div>
    )
}

export default Dashboard;
