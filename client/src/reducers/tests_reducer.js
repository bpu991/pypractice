import { RUN_TESTS, CLEAR_RESULTS } from "../actions/tests_actions";

export default function testsReducer(state = {}, action) {
  switch (action.type) {
    case CLEAR_RESULTS:
      return {}
    case RUN_TESTS:
      return {...state, results: action.results};
    default:
      return state;
  }
}
