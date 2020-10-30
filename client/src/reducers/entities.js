import { combineReducers } from 'redux';
import problems from './problems';
import results from "./tests_reducer";
import profiles from './profiles';


const entitiesReducer = combineReducers({
  problems,
  results,
  profiles,
});

export default entitiesReducer;
