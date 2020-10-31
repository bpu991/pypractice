import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import LandingOrDashboard from "./components/LandingOrDashboard";
import Footer from "./components/Footer";
import Problems from "./components/Problems";
import UserProfile from "./components/UserProfile";
import ProblemPage from "./components/ProblemPage";
import {themeObj} from './theme'

import { restoreCSRF } from "./actions/csrf_actions";


const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "93vh",
  },
}));

function App() {
  const theme = createMuiTheme(themeObj);
  const classes = useStyles();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(restoreCSRF());
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <BrowserRouter>
        <div className={classes.root}>
          <NavBar />
          <Switch>
            <Route exact path='/signin'>
              <SignIn />
            </Route>
            <Route exact path='/signup'>
              <SignUp />
            </Route>

            <Route exact path='/problems'>
              <Problems />
            </Route>

            <Route exact path='/users/:userId'>
              <UserProfile />
            </Route>

            <Route exact path='/problems/:problemId'>
              <ProblemPage />
            </Route>

            <Route exact path='/'>
              <LandingOrDashboard />
            </Route>
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
