import { combineReducers } from 'redux';
import authentication from './authentication';
import entities from './entities';

const rootReducer = combineReducers({
  authentication,
  entities,
});

export default rootReducer;
