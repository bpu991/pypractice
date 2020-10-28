import React from "react";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

export const AuthRoute = ({ component: Component, ...rest }) => {
  const currentUserId = useSelector((state) => state.authentication.id);
  return (
    <Route
      {...rest}
      render={(props) =>
        currentUserId ? <Redirect to='/' /> : <Component {...props} />
      }
    />
  );
};
