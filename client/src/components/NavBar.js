import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { NavLink, useLocation, useHistory } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import AccountCircleIcon from '@material-ui/icons/AccountCircle';

import SvgLogo from "./SvgLogo";
import { userActions } from "../actions/user_actions";

const NavBar = () => {
    const history = useHistory();
    const loggedOut = useSelector((state) => !state.authentication.user);
    const profile = useSelector(state => state.authentication.user);
    const location = useLocation();
    const pos = location.pathname === "/" && loggedOut ? "absolute" : "static";
    const dispatch = useDispatch();

    const handleSignout = () => {
        dispatch(userActions.logout())
        history.push('/')
    };
    return (
        <AppBar color='transparent' position={pos} elevation={0}>
            <Toolbar>
                <IconButton component={NavLink} to='/'>
                    <SvgLogo />
                </IconButton>
                <div style={{ flexGrow: 1 }} />
                <Button component={NavLink} to='/problems'>
                    Practice
        </Button>
                {!loggedOut ? (
                    <>
                        <IconButton component={NavLink} to={`/users/${profile.id}`}>
                            <AccountCircleIcon />
                        </IconButton>
                        <Button onClick={handleSignout}>Sign Out</Button>

                    </>
                ) : (
                        <>
                            <Button component={NavLink} to='/signin'>
                                Sign In
            </Button>
                            <Button component={NavLink} to='/signup'>
                                Sign Up
            </Button>
                        </>
                    )}
            </Toolbar>
        </AppBar>
    );
};

export default NavBar;
