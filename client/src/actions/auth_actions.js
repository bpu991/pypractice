export const SET_USER = 'pypractice/authentication/SET_USER';
export const REMOVE_USER = 'pypractice/authentication/REMOVE_USER';



export const removeUser = () => ({
    type: REMOVE_USER,
});

export const setUser = user => ({
    type: SET_USER,
    user,
});



export const login = (email, password) => async dispatch => {
    const response = await fetch(`/api/session`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        const { user } = await response.json();
        dispatch(setUser(user));
    }
};

export const logout = () => async (dispatch) => {
    const response = await fetch(`/api/session`, {
        method: 'delete',
    });

    if (response.ok) {
        dispatch(removeUser());
    }
};

export const signup = (username, email, password) => async dispatch => {
    const response = await fetch(`/api/users`, {
        method: 'post',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, email, password }),
    });
    if (response.ok) {
        const { user } = await response.json();
        dispatch(setUser(user));
    }
}
