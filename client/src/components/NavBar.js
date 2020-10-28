import React from "react";
import { useSelector } from "react-redux";
import { NavLink, useLocation } from "react-router-dom";
import AppBar from "@material-ui/core/AppBar";
import Button from "@material-ui/core/Button";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";

import SvgLogo from "./SvgLogo";

const NavBar = () => {
  const loggedOut = useSelector((state) => !state.authentication.user);
  const location = useLocation();
  const pos = location.pathname === "/" && loggedOut ? "absolute" : "static";

  const handleSignout = () => {
    // // need to handle signing out
    // // dispatch(signout());
    // history.push("/");
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
          <Button onClick={handleSignout}>Sign Out</Button>
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
