import { combineReducers } from "redux";
import problems from "./problems";
import results from "./tests_reducer";

const entitiesReducer = combineReducers({
  problems,
  results,
});

export default entitiesReducer;
