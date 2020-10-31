//actions types
//run tests for a problem
export const RUN_TESTS = "/pypractice/problems/RUN_TESTS";

export const CLEAR_RESULTS = "/pypractice/problems/CLEAR_RESULTS";

export const runTests = (results) => ({
  type: RUN_TESTS,
  results,
});

export const clearResults = () => ({
  type: CLEAR_RESULTS,
})
