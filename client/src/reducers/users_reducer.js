import { userConstants } from "../constants/user_constants";

export function users(state = {}, action) {
  switch (action.type) {
    case userConstants.DELETE_REQUEST:
      // add 'deleting:true' property to user being deleted
      return {
        ...state,
        items: state.items.map((user) =>
          user.id === action.id ? { ...user, deleting: true } : user
        ),
      };
    case userConstants.DELETE_SUCCESS:
      // remove deleted user from state
      return {
        items: state.items.filter((user) => user.id !== action.id),
      };
    case userConstants.DELETE_FAILURE:
      // remove 'deleting:true' property and add 'deleteError:[error]' property to user
      return {
        ...state,
        items: state.items.map((user) => {
          if (user.id === action.id) {
            // make copy of user without 'deleting:true' property
            const { deleting, ...userCopy } = user;
            // return copy of user with 'deleteError:[error]' property
            return { ...userCopy, deleteError: action.error };
          }

          return user;
        }),
      };
    case SAVE_CODE:
      const probId = action.probId;
      const attempts = authentication.user.attempts;
      let attemptId;
      for (let i = 0; i < attempts.length; i++) {
        if (authentication.user.attempts[i].problem_id === probId) {
          attemptId = i;
          break;
        }
      }
      return {
        ...state,
      };
    case UPDATE_CODE:
      const probId = action.probId;
      const attempts = authentication.user.attempts;
      let attemptId;
      for (let i = 0; i < attempts.length; i++) {
        if (authentication.user.attempts[i].problem_id === probId) {
          attemptId = i;
          break;
        }
      }
      return {
        ...state,
        [authentication.user.attempts[attemptId]]: action.currentAttempt,
      };
    default:
      return state;
  }
}
