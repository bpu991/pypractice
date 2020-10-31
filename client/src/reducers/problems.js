import { LOAD_PROBLEMS, LOAD_PROBLEM_DETAILS, SAVE_CODE } from '../actions/problem_actions';

export default function reducer(state = { byId: {}, activeProblem: {} }, action) {
    switch (action.type) {
        case LOAD_PROBLEMS:
            return { ...state, byId: action.problems };
        case LOAD_PROBLEM_DETAILS:
            return { ...state, activeProblem: action.activeProblem }
        case SAVE_CODE:
            return { ...state, activeProblem: { ...state.activeProblem, ...action.attemptData } }
        default:
            return state;
    }
}
