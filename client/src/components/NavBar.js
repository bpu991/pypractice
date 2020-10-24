import React from 'react';
import { useSelector } from 'react-redux'
import { NavLink, useHistory } from 'react-router-dom';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import Toolbar from '@material-ui/core/Toolbar'

const NavBar = () => {
    const loggedOut = useSelector(state => !state.authentication.id);
    const history = useHistory();


    const handleSignout= () => {
        // need to handle signing out
        // dispatch(signout());
        history.push('/')
    }
    return (
        <AppBar color='transparent' position="static" elevation={0}>
            <Toolbar>
                <Button component={NavLink} to='/'>Home</Button>
                {(!loggedOut) ? (
                    <Button onClick={handleSignout}>Sign Out</Button>
                ) : (
                        <>
                            <Button component={NavLink} to='/signin'>Sign In</Button>
                            <Button component={NavLink} to='/signup'>Sign Up</Button>
                        </>
                    )}
            </Toolbar>
        </AppBar>
    )
}

export default NavBar;
