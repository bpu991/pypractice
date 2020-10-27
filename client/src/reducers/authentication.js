import Cookies from 'js-cookie';
import { SET_USER, REMOVE_USER } from '../actions/auth_actions'

function loadUser() {
    const authToken = Cookies.get("token");
    if (authToken) {
        try {
            const payload = authToken.split(".")[1];
            const decodedPayload = atob(payload);
            const payloadObj = JSON.parse(decodedPayload);
            const { data } = payloadObj;
            return data;
        } catch (e) {
            Cookies.remove("token");
        }
    }
    return {};
}

const authReducer = (state = loadUser(), action) => {
    switch (action.type) {
        case SET_USER:
            return action.user
        case REMOVE_USER:
            return {};
        default: return state;
    }
}

export default authReducer;
