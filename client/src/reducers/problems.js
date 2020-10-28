import { LOAD_PROBLEMS, LOAD_PROBLEM_DETAILS } from '../actions/problems'

export default function reducer(state = {byId:{}, activeProblem:{}}, action) {
    switch (action.type) {
        case LOAD_PROBLEMS:
            return { ...state, byId: action.problems };
        case LOAD_PROBLEM_DETAILS:
            return { ...state, activeProblem: action.activeProblem }
        default: {
            return state;
        }
    }
}
