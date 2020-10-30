export const userService = {
  login,
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
  const response = await fetch(`/api/session/login`, requestOptions);

  // const user = await handleResponse(response);
  const user = await response.json()
  console.log('SERVICES', user)

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

  const user = await response.json()
  console.log('SERVICES', user)

  return user.current_user || {};
}
