import { csrfConstants } from "../constants/csrf_constants";

export function csrf(state = {}, action) {
  switch (action.type) {
    case csrfConstants.SET_CSRF_TOKEN:
      return {
        ...state,
        csrfToken: action.csrfToken,
      };
    default:
      return state;
  }
}
