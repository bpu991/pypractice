import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, Redirect } from "react-router-dom";

import { makeStyles } from "@material-ui/core";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Link from "@material-ui/core/Link";

import { userActions } from "../actions/user_actions";

const useStyles = makeStyles((theme) => ({
    space: {
        marginTop: 100,
    },
    button: {
        paddingTop: 10,
        paddingBottom: 10,
        marginTop: 15,
        marginBottom: 15
    }
}));

const SignIn = () => {
    const classes = useStyles();
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [demoEmail, setDemoEmail] = useState("demo@example.com")
    const [demoPassword, setDemoPassword] = useState("password")
    const err = useSelector(state=>state.errors.auth)

    const loggedOut = useSelector(state => !state.authentication.user)

    if (!loggedOut) {
        return (
            <Redirect to='/' />
        )
    }

    const handleSubmit = (e) => {
        e.preventDefault();
        dispatch(userActions.login(email, password));
    };

    const handleDemoLogin = (e) => {
        e.preventDefault();
        dispatch(userActions.login(demoEmail, demoPassword));
    };
    return (
        <Container component='main' maxWidth='xs'>
            <div className={classes.space}>
                <Typography variant='h5'>Sign in</Typography>
                <form onSubmit={handleSubmit}>
                    {(err)?(
                    <Typography variant="caption" color="error">
                        {err.errors}
                    </Typography>
                    ):(null)}
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        id='email'
                        label='Email Address'
                        name='email'
                        autoComplete='email'
                        autoFocus
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <TextField
                        variant='outlined'
                        margin='normal'
                        required
                        fullWidth
                        name='password'
                        label='Password'
                        type='password'
                        id='password'
                        autoComplete='current-password'
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <Button
                        className={classes.button}
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        size='large'>
                        Sign In
                    </Button>
                    
                </form>
                <form onSubmit={handleDemoLogin}>
                    <Button
                        className={classes.button}
                        type='submit'
                        fullWidth
                        variant='contained'
                        color='primary'
                        size='large'>
                        Demo Login
                    </Button>
                </form>
                <Link component={NavLink} to='/signup' variant='body2'>
                        Don't have an account? Sign up
                </Link>
            </div>
        </Container>
    );
};

export default SignIn;
