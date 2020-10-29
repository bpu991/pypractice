import {profileConstants} from '../constants/profile_constants'

export default function reducer(state = {}, action) {
    switch (action.type) {
        case profileConstants.SET_PROFILE: {
            return action.profile
        }
        default: {
            return state;
        }
    }
}