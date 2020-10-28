import { combineReducers } from "redux";
import { authentication } from "./authentication_reducer";
import { csrf } from "./csrf_reducer";
import entities from "./entities";

const rootReducer = combineReducers({
  authentication,
  entities,
  csrf,
});

export default rootReducer;
