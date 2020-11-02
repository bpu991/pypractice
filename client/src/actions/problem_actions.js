import { userService } from "../services/user_services";
// action types
// put collection of problems into state
export const LOAD_PROBLEMS = '/pypractice/problems/LOAD_PROBLEMS';

// put single problem details into state as active problem
export const LOAD_PROBLEM_DETAILS = '/pypractice/problems/LOAD_PROBLEM_DETAILS';

export const SAVE_CODE = '/pypractice/problems/SAVE_CODE';

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



export const saveCode = (attemptData) => ({
    type: SAVE_CODE,
    attemptData,
})

// load all problems
export const loadProblemsThunk = () => async dispatch => {
    const res = await fetch(`/api/problems`);
    if (res.ok) {
        const data = await res.json();
        dispatch(loadProblems(data.problems));
    }
}

// load problems that current user has attempted
export const loadAttemptsThunk = (userId) => async dispatch => {
    const res = await fetch(`/api/users/${userId}/attempts`);
    if (res.ok) {
        const problems = await res.json();
        dispatch(loadProblems(problems));
    }
}

// thunk for loading the details for a single problem
export const loadProblemDetailsThunk = (problemId) => async dispatch => {
    const res = await fetch(`/api/problems/${problemId}`);
    if (res.ok) {
        const problem = await res.json();
        dispatch(loadProblem(problem));
    }
}

export const saveCodeThunk = (code, userId, probId, solved) => async (
    dispatch,
    getState
) => {
    const csrf = getState().csrf.csrfToken;
    const response = await userService.saveCode(code, userId, probId, solved, csrf);

    dispatch(saveCode(response));
};
