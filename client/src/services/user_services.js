import { apiUrl } from "../config";

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
  const response = await fetch(`${apiUrl}/session/login`, requestOptions);
  
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

  const response = await fetch(`${apiUrl}/session/signup`, requestOptions);
  
  const user = await response.json()
  console.log('SERVICES', user)
  
  return user.current_user || {};
}





// function handleResponse(response) {
//   return response.text().then((text) => {
//     const data = text && JSON.parse(text);
//     if (!response.ok) {
//       if (response.status === 401) {
//         // auto logout if 401 response returned from api
//         logout();
//       }

//       const error = (data && data.message) || response.statusText;
//       return Promise.reject(error);
//     }

//     return data;
//   });
// }
