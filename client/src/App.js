import React, { useEffect } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { useDispatch } from "react-redux";

import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

<<<<<<< HEAD
import PythonTerminal from './components/PythonTerminal';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'
import LandingOrDashboard from './components/LandingOrDashboard'
import Footer from './components/Footer'
import Problems from './components/Problems';
import ProblemPage from './components/ProblemPage'
=======
import PythonTerminal from "./components/PythonTerminal";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import LandingOrDashboard from "./components/LandingOrDashboard";
import Footer from "./components/Footer";
import Problems from "./components/Problems";

import { PrivateRoute } from "./components/PrivateRoute";
import { AuthRoute } from "./components/AuthRoute";
import { restoreCSRF } from "./actions/csrf_actions";
>>>>>>> master

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "93vh",
  },
}));

function App() {
  const theme = createMuiTheme();
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
            <AuthRoute exact path='/signin'>
              <SignIn />
            </AuthRoute>
            <Route exact path='/signup'>
              <SignUp />
            </Route>

            <Route path='/testing'>
              <PythonTerminal />
            </Route>

<<<<<<< HEAD
            <Route exact path="/problems">
                <Problems/>
            </Route>

            <Route exact path="/problems/:problemId">
                <ProblemPage/>
            </Route>


            <Route exact path="/">
                <LandingOrDashboard/>
=======
            <Route path='/problems'>
              <Problems />
>>>>>>> master
            </Route>

            <PrivateRoute exact path='/'>
              <LandingOrDashboard />
            </PrivateRoute>
          </Switch>
        </div>
        <Footer />
      </BrowserRouter>
      )
    </ThemeProvider>
  );
}

export default App;
