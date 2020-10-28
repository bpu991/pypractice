import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom';

import {makeStyles} from '@material-ui/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

import {signup} from '../actions/auth_actions';


const useStyles = makeStyles(theme => ({
    space: {
        marginTop: 100
    }
}))

const SignUp = () => {
    const classes= useStyles();
    const dispatch = useDispatch();
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');


    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);
    const updateUsername = e => setUsername(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(signup(username, email, password));
    }


    return (
        <Container component="main" maxWidth="xs">
        <div className={classes.space}>
            <Typography variant="h5">Sign up</Typography>
            <form onSubmit={handleSubmit}>
            <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="username"
                    label="Username"
                    name="username"
                    autoComplete="username"
                    autoFocus
                    value={username}
                    onChange={updateUsername}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    value={email}
                    onChange={updateEmail}
                />
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    name="password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                    value={password}
                    onChange={updatePassword}
                />
                <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    color="primary"
                >Sign Up</Button>
                <Link component={NavLink} to="/signin" variant="body2">
                   Already have an account? Sign in
                </Link>
            </form>
        </div>
        </Container>
    )
}

export default SignUp;
