import { RUN_TESTS } from "../actions/tests_actions";

export default function testsReducer(state = {}, action) {
  switch (action.type) {
    case RUN_TESTS: {
      return {
        ...state,
        results: action.results,
      };
    }
    default: {
      return state;
    }
  }
}
