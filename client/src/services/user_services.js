import { apiUrl } from "../config";

export const userService = {
  login,
  register,
  saveCode,
  updateCode,
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

  // const user = await handleResponse(response);
  const user = await response.json();
  console.log("SERVICES", user);

  return user.current_user || {};
}

async function register(new_user, csrf) {
  const requestOptions = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf,
    },
    body: JSON.stringify(new_user),
  };

  const response = await fetch(`${apiUrl}/session/signup`, requestOptions);

  const user = await response.json();
  console.log("SERVICES", user);

  return user.current_user || {};
}

async function saveCode(code, userId, probId, csrf) {
  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf,
    },
    body: JSON.stringify(code),
  };

  const response = await fetch(
    `${apiUrl}/users/${userId}/attempts/${probId}`,
    options
  );

  const updated_code = response.json();

  return updated_code || "";
}

async function updateCode(code, attemptId, csrf) {
  const options = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
      "X-CSRFToken": csrf,
    },
    body: JSON.stringify(code),
  };

  const response = await fetch(
    `${apiUrl}/users/attempts/${attemptId}`,
    options
  );

  const updated_code = response.json();

  return updated_code || "";
}
