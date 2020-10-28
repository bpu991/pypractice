import Cookies from "js-cookie";
import { userConstants } from "../constants/user_constants";

function loadUser() {
  const authToken = Cookies.get("access_token_cookie");
  if (authToken) {
    try {
      const payload = authToken.split(".")[1];
      const decodedPayload = atob(payload);
      const payloadObj = JSON.parse(decodedPayload);
      const { data } = payloadObj;
      return data;
      
    } catch (e) {
      Cookies.remove("access_token_cookie");
    }
  }
  return {};
}

export function authentication(state = loadUser(), action) {
  switch (action.type) {
    case userConstants.LOGIN_REQUEST:
      return {
        ...state,
        loggingIn: true,
        user: action.user,
      };
    case userConstants.LOGIN_SUCCESS:
      console.log('ACTION ASDSA', action.user)
      return {
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    default:
      return state;
  }
}
