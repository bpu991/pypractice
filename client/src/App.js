import React, { useEffect, useState } from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";

import {
  ThemeProvider,
  createMuiTheme,
  makeStyles,
} from "@material-ui/core/styles";
import CssBaseline from "@material-ui/core/CssBaseline";

import PythonTerminal from "./components/PythonTerminal";
import SignIn from "./components/SignIn";
import SignUp from "./components/SignUp";
import NavBar from "./components/NavBar";
import LandingOrDashboard from "./components/LandingOrDashboard";
import Footer from "./components/Footer";
import Problems from "./components/Problems";

import { PrivateRoute } from "./components/PrivateRoute";
import { AuthRoute } from "./components/AuthRoute";

const useStyles = makeStyles((theme) => ({
  root: {
    minHeight: "93vh",
  },
}));

let authContextValue;

function App() {
  const theme = createMuiTheme();
  const classes = useStyles();

  const [fetchWithCSRF, setFetchWithCSRF] = useState(() => fetch);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [loading, setLoading] = useState(true);

  authContextValue = {
    fetchWithCSRF,
    currentUserId,
    setCurrentUserId,
  };

  const logoutUser = async () => {
    const response = await fetchWithCSRF("/logout", {
      method: "POST",
      credentials: "include",
    });
    if (response.ok) {
      setCurrentUserId(null);
    }
  };

  useEffect(() => {
    async function restoreCSRF() {
      const response = await fetch("/api/csrf/restore", {
        method: "GET",
        credentials: "include",
      });
      if (response.ok) {
        const authData = await response.json();
        setFetchWithCSRF(() => {
          return (resource, init) => {
            if (init.headers) {
              init.headers["X-CSRFToken"] = authData.csrf_token;
            } else {
              init.headers = {
                "X-CSRFToken": authData.csrf_token,
              };
            }
            return fetch(resource, init);
          };
        });
        if (authData.current_user_id) {
          console.log(authData);
          setCurrentUserId(authData.current_user_id);
        }
      }
      setLoading(false);
    }
    restoreCSRF();
  }, []);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {loading && <div>Loading...</div>}
      {!loading && (
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

              <Route path='/problems'>
                <Problems />
              </Route>

              <PrivateRoute exact path='/'>
                <LandingOrDashboard />
              </PrivateRoute>
            </Switch>
          </div>
          <Footer />
        </BrowserRouter>
      )}
    </ThemeProvider>
  );
}

export { authContextValue };

export default App;
