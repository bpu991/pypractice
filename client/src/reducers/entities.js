import { combineReducers } from 'redux';
import problems from './problems';
import attempts from './attempts';

const entitiesReducer = combineReducers({
  problems,
  attempts,
});

export default entitiesReducer;
