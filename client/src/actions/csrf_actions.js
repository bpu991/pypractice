import { csrfConstants } from "../constants/csrf_constants";
import { userConstants } from "../constants/user_constants";

export const restoreCSRF = () => async (dispatch) => {
  const response = await fetch("/api/session/csrf/restore", {
    method: "GET",
    credentials: "include",
  });
  console.log(response)
  if (response.ok) {
    const authData = await response.json();
    console.log(authData)
    if (authData.csrf_token) {
      dispatch(setCSRF(authData.csrf_token));
    }
    if (authData.current_user) {
      console.log(authData.user, authData)
      //   Change to set current user dispatch call
      dispatch(restore(authData.current_user));
    }
  }
};


const restore = (user) => ({
  type: userConstants.LOGIN_SUCCESS,
  user,
});

const setCSRF = (csrfToken) => ({
  type: csrfConstants.SET_CSRF_TOKEN,
  csrfToken,
});









// const fetchWithCSRF = (resource, init) => (dispatch, getState) => {
//   const csrfToken = getState().csrf.csrfToken;
//   if (init.headers) {
//     init.headers["X-CSRFToken"] = csrfToken;
//   } else {
//     init.headers = {
//       "X-CSRFToken": csrfToken,
//     };
//   }
//   return fetch(resource, init);
// };
// const setFetchWithCSRF = (authData) => ({
//   type: csrfConstants.SET_CSRF_FETCH,
//   fetchWithCSRF: (authData) => {
//     return (resource, init) => {
//       if (init.headers) {
//         init.headers["X-CSRFToken"] = authData.csrf_token;
//       } else {
//         init.headers = {
//           "X-CSRFToken": authData.csrf_token,
//         };
//       }
//       return fetch(resource, init);
//     };
//   },
// });
