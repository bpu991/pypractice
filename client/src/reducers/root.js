import { combineReducers } from "redux";
import { authentication } from "./authentication_reducer";
import { csrf } from "./csrf_reducer";
import entities from "./entities";
import tests from "./tests_reducer";

const rootReducer = combineReducers({
  authentication,
  entities,
  csrf,
  tests,
});

export default rootReducer;
