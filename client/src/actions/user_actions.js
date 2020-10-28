import { userConstants } from "../constants/user_constants";
import { userService } from "../services/user_services";
import { alertActions } from "./alert_actions";

export const userActions = {
  login,
  logout,
  register,
  _delete,
};

function login(email, password) {
  return async (dispatch, getState) => {
    dispatch(request({ email }));
    const csrf = getState().csrf.csrfToken;
    try {
      const user = await userService.login(email, password, csrf);
      dispatch(success(user));

    } catch (error) {
      dispatch(failure(error.toString()));
      dispatch(alertActions.error(error.toString()));
      
    }
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    console.log('SUCCESS USE ACTIONS', user)
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

function logout() {
  userService.logout();
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return async (dispatch, getState) => {
    dispatch(request(user));

    try {
    const csrf = getState().csrf.csrfToken;
    const new_user = await userService.register(user, csrf);
    dispatch(success(new_user));
    dispatch(alertActions.success("Registration successful"));
    } catch (error){
        dispatch(failure(error.toString()));
        dispatch(alertActions.error(error.toString()));
      }
  };

  function request(user) {
    return { type: userConstants.REGISTER_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.REGISTER_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.REGISTER_FAILURE, error };
  }
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  return (dispatch) => {
    dispatch(request(id));

    userService.delete(id).then(
      (user) => dispatch(success(id)),
      (error) => dispatch(failure(id, error.toString()))
    );
  };

  function request(id) {
    return { type: userConstants.DELETE_REQUEST, id };
  }
  function success(id) {
    return { type: userConstants.DELETE_SUCCESS, id };
  }
  function failure(id, error) {
    return { type: userConstants.DELETE_FAILURE, id, error };
  }
}
