import { apiUrl } from "../config";
// import { authHeader } from "./authHeader";

export const userService = {
  login,
  logout,
  register,
};

async function login(email, password, csrf) {
  const requestOptions = {
    method: "POST",
    headers: { 
        "Content-Type": "application/json",
        "X-CSRFToken": csrf,
    },
    credentials: "include",
    body: JSON.stringify({ email, password }),
  };
  const response = await fetch(`${apiUrl}/session/login`, requestOptions);
  const user = await handleResponse(response);
  console.log('SERVICES', user)
  return () => {
    // store user details and jwt token in local storage to keep user logged in between page refreshes
    if (user) {
    localStorage.setItem("user", JSON.stringify(user));
    return user;
  } else {
    return {};
  }
  };
}

function logout() {
  // remove user from local storage to log user out
  localStorage.removeItem("user");
}

function register(user) {
  const requestOptions = {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(user),
  };

  return fetch(`${apiUrl}/users/register`, requestOptions).then(handleResponse);
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
