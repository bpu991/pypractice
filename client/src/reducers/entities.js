import { combineReducers } from 'redux';
import problems from './problems';
import attempts from './attempts';
import profiles from './profiles'
const entitiesReducer = combineReducers({
  problems,
  attempts,
  profiles
});

export default entitiesReducer;
