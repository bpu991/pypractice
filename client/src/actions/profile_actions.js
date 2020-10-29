import { profileConstants } from  "../constants/profile_constants"

export const setProfile = (profile) => {
    return {
        type: profileConstants.SET_PROFILE,
        profile
    };
};

export const profilePage = (userId) => async (dispatch) => { 
    
    const res = await fetch(`/api/users/${userId}`); 
    if (res.ok) {
        const profile = await res.json();
        dispatch(setProfile( profile )) 
    }
}
