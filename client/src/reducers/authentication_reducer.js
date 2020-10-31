import { userConstants } from "../constants/user_constants";

export function authentication(state = {}, action) {
  switch (action.type) {
    case userConstants.LOGIN_SUCCESS:
      return {
        user: action.user,
      };
    case userConstants.LOGIN_FAILURE:
      return {};
    case userConstants.LOGOUT:
      return {};
    case userConstants.REGISTER_SUCCESS:
      return {
        ...state,
        user: action.user
      }
    default:
      return state;
  }
}
