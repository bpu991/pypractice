// const SET_PROFILE = 'photos/SET_PROFILE'

// export const setProfile = (profile) => {
//     return {
//         type: SET_PROFILE,
//         profile
//     };
// };

// export const profilePage = (userId) => async (dispatch) => {
//     // const csrfToken = Cookies.get("XSRF-TOKEN");
//     const res = await fetch(`/api/users/${userId}`);
//     if (res.ok) {
//         const { username, userPhotos } = await res.json();
//         dispatch(setProfile({ username, userPhotos }))
//     }
// }

// export default function profileReducer(state = { userPhotos: [] }, action) {
//     switch (action.type) {
//         case SET_PROFILE:
//             return action.profile;
//         default:
//             return state;
//     }
// }