import { apiUrl } from '../config';

// action types
// put collection of problems into state
export const LOAD_PROBLEMS = '/pypractice/problems/LOAD_PROBLEMS';

// put single problem details into state as active problem
export const LOAD_PROBLEM_DETAILS = '/pypractice/problems/LOAD_PROBLEM_DETAILS';


export const LOAD_TESTS = 'LOAD_TESTS';

// action creators
// put collection of problems into state
export const loadProblems = (problems) => ({
    type: LOAD_PROBLEMS,
    problems
})
// put single problem details into state as active problem
export const loadProblem = (problem) => ({
    type: LOAD_PROBLEM_DETAILS,
    activeProblem: problem
})

// load all problems
export const loadProblemsThunk = () => async dispatch => {
    const res = await fetch(`${apiUrl}/problems`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadProblems(data.problems));
    }
}

// load problems that current user has attempted
export const loadAttemptsThunk = (userId) => async dispatch => {
    const res = await fetch(`${apiUrl}/users/${userId}/attempts`);
    if (res.ok) {
        const problems = await res.json();
        dispatch(loadProblems(problems));
    }
}

// thunk for loading the details for a single problem
export const loadProblemDetailsThunk = (problemId) => async dispatch => {
    const res = await fetch(`${apiUrl}/problems/${problemId}`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadProblem(data.problem));
    }
}


export const getTest = (problemId, code) => async (dispatch, getState) => {
    //fetch problem tests from backend

}
