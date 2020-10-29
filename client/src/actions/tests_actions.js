//actions types
//run tests for a problem
export const RUN_TESTS = "/pypractice/problems/RUN_TESTS";

export const runTests = (results) => ({
  type: RUN_TESTS,
  results,
});

export const runTestsThunk = (problem, solution) => async (dispatch) => {
  console.log(problem, solution);
  const results = problem.runTests();
  console.log(results);
  dispatch(runTests(results));
};
