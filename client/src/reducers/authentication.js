import Cookies from 'js-cookie';


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
        default: return state;
    }
}

export default authReducer;
