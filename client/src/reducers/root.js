import { combineReducers } from "redux";
import { authentication } from "./authentication_reducer";
import entities from "./entities";

const rootReducer = combineReducers({
  authentication,
  entities,
});

export default rootReducer;
