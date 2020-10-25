import { createStore, applyMiddleware, compose  } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root';

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const storeEnhancer = composeEnhancers(applyMiddleware(thunk));

const configureStore = initialState => {
  return createStore(
    rootReducer,
    initialState,
    storeEnhancer
  );
};

export default configureStore;
