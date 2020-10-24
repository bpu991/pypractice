import React from 'react';
import { BrowserRouter, Switch, Route, NavLink } from 'react-router-dom';

import CssBaseline from '@material-ui/core/CssBaseline';

import UserList from './components/UsersList';
import PythonTerminal from './components/PythonTerminal';
import SignIn from './components/SignIn'
import SignUp from './components/SignUp'
import NavBar from './components/NavBar'


function App() {

  return (
     <>
    <CssBaseline />
    <BrowserRouter>
        <NavBar/>
        <Switch>
            <Route exact path="/signin">
                <SignIn />
            </Route>
            <Route exact path="/signup">
                <SignUp />
            </Route>

            <Route path="/users">
                <UserList />
            </Route>

            <Route path="/testing">
                <PythonTerminal/>
            </Route>


            <Route path="/">
                <h1>My Home Page</h1>
            </Route>
        </Switch>
    </BrowserRouter>
    </>
  );
}

export default App;
