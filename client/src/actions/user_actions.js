import { userConstants } from "../constants/user_constants";
import { userService } from "../services/user_services";
// import { alertActions } from "./alert_actions";

function login(email, password) {
  return async (dispatch, getState) => {
    const csrf = getState().csrf.csrfToken;
    try {
      const resp = await userService.login(email, password, csrf);
      if (resp.error) {
        dispatch(failure(resp.error));
      } else{
        dispatch(success(resp));
      }
    } catch (error) {
      dispatch(failure(error.toString()));
    }
  };

  function request(user) {
    return { type: userConstants.LOGIN_REQUEST, user };
  }
  function success(user) {
    return { type: userConstants.LOGIN_SUCCESS, user };
  }
  function failure(error) {
    return { type: userConstants.LOGIN_FAILURE, error };
  }
}

const logout = () => async (dispatch, getState) => {
  const csrf = getState().csrf.csrfToken;
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf,
    },
    credentials: "include",
  };
  const response = await fetch(`/api/session/logout`, requestOptions);
  if (response.ok) {
    dispatch(removeUser());
  }
};

function removeUser() {
  return { type: userConstants.LOGOUT };
}

function register(user) {
  return async (dispatch, getState) => {
    dispatch(request(user));

    try {
      const csrf = getState().csrf.csrfToken;
      const newUser = await userService.register(user, csrf);
      dispatch(success(newUser));
      // dispatch(alertActions.success("Registration successful"));
    } catch (error) {
      dispatch(failure(error.toString()));
      // dispatch(alertActions.error(error.toString()));
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




export const updateCodeThunk = (code, attemptId) => async (
  dispatch,
  getState
) => {
  const csrf = getState().csrf.csrfToken;
  const currentAttempt = await userService.updateCode(code, attemptId, csrf);

  dispatch(actionUpdateCode(), currentAttempt);
};

function actionUpdateCode() {
  return { type: userConstants.UPDATE_CODE };
}

export const userActions = {
  login,
  logout,
  register,
  updateCodeThunk,
};
