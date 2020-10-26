import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { NavLink } from 'react-router-dom';

import { makeStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container'
import Link from '@material-ui/core/Link'

import { login } from '../actions/auth_actions'

const useStyles = makeStyles(theme => ({
    space: {
        marginTop: 100
    }
}))

const SignIn = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const updateEmail = e => setEmail(e.target.value);
    const updatePassword = e => setPassword(e.target.value);

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(login(email, password));
    }

    return (
        <Container  component="main" maxWidth="xs">
        <div className={classes.space}>
            <Typography variant="h5">Sign in</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    variant="outlined"
                    margin="normal"
                    required
                    fullWidth
                    id="email"
                    label="Email Address"
                    name="email"
                    autoComplete="email"
                    autoFocus
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
                >Sign In</Button>
                <Link component={NavLink} to="/signup" variant="body2">
                    Don't have an account? Sign up
                </Link>
            </form>
        </div>
        </Container>
    )
}

export default SignIn;
