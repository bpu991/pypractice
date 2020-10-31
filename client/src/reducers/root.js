import { combineReducers } from "redux";
import { authentication } from "./authentication_reducer";
import { csrf } from "./csrf_reducer";
import entities from "./entities";
import errors from "./errors"

const rootReducer = combineReducers({
  authentication,
  entities,
  csrf,
  errors,
});

export default rootReducer;
