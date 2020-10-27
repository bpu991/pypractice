import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import { ThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles'
import CssBaseline from '@material-ui/core/CssBaseline';

import PythonTerminal from './components/PythonTerminal';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'
import LandingOrDashboard from './components/LandingOrDashboard'
import Footer from './components/Footer'
import Problems from './components/Problems';

const useStyles = makeStyles((theme) => ({
    root: {
      minHeight: '93vh',
    },
}))

function App() {
    const theme = createMuiTheme();
    const classes = useStyles();

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline />
    <BrowserRouter>
    <div className={classes.root}>
        <NavBar/>
        <Switch>
            <Route exact path="/signin">
                <SignIn />
            </Route>
            <Route exact path="/signup">
                <SignUp />
            </Route>

            <Route path="/testing">
                <PythonTerminal/>
            </Route>

            <Route path="/problems">
                <Problems/>
            </Route>


            <Route exact path="/">
                <LandingOrDashboard/>
            </Route>

        </Switch>
    </div>
    <Footer />
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
