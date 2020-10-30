export const userService = {
  login,
  register,
  saveCode,
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
  const response = await fetch(`/api/session/login`, requestOptions);

  // const user = await handleResponse(response);
  const user = await response.json();
  // console.log("SERVICES", user);

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

  const response = await fetch(`/api/session/signup`, requestOptions);

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
    `/api/users/${userId}/attempts/${probId}`,
    options
  );

  const attempts = response.json();

  return attempts || "";
}

// async function updateCode(code, attemptId, csrf) {
//   const options = {
//     method: "PUT",
//     headers: {
//       "Content-Type": "application/json",
//       "X-CSRFToken": csrf,
//     },
//     body: JSON.stringify(code),
//   };

//   const response = await fetch(
//     `/api/users/attempts/${attemptId}`,
//     options
//   );

//   const updated_code = response.json();

//   return updated_code || "";
// }
