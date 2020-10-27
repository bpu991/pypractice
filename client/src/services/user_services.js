import { apiUrl } from "../config";
import { authHeader } from "./authHeader";
import { authContextValue } from "../App";

export const userService = {
  login,
  logout,
  register,
  getById,
  delete: _delete,
};

function login(email, password) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  };

  return authContextValue
    .fetchWithCSRF(`${apiUrl}/user_routes/login`, requestOptions)
    .then(handleResponse)
    .then((user) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      localStorage.setItem("user", JSON.stringify(user));
      return user;
    });
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function getById(id) {
  const requestOptions = {
    method: "GET",
    headers: authHeader(),
  };

  return authContextValue
    .fetchWithCSRF(`${apiUrl}/user_routes/${id}`, requestOptions)
    .then(handleResponse);
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return authContextValue
    .fetchWithCSRF(`${apiUrl}/users/register`, requestOptions)
    .then(handleResponse);
}

// prefixed function name with underscore because delete is a reserved word in javascript
function _delete(id) {
  const requestOptions = {
    method: "DELETE",
    headers: authHeader(),
  };

  return authContextValue
    .fetchWithCSRF(`${apiUrl}/users/${id}`, requestOptions)
    .then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if (response.status === 401) {
        // auto logout if 401 response returned from api
        logout();
      }

      const error = (data && data.message) || response.statusText;
      return Promise.reject(error);
    }

    return data;
  });
}
