import {userConstants} from '../constants/user_constants'

export default function errors(state = {}, action) {
    switch (action.type) {
        case userConstants.LOGIN_FAILURE:
            return {auth: action.error};
        case userConstants.LOGIN_SUCCESS:
            return {};
        default: {
            return state;
        }
    }
}
