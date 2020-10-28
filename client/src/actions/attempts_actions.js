//actions types
//run tests for a problem
export const RUN_TESTS = '/pypractice/problems/RUN_TESTS';

export const runTests = results => ({
    type: RUN_TESTS,
    results,
});

export const runTestsThunk = (solution, problem) => async dispatch => ({

})
