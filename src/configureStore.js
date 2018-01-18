import { createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { createLogger } from 'redux-logger';
import reducers from './reducers';
import thunk from 'redux-thunk';

const configureStore = () => {
  const middlewares = [];

  if (process.env.NODE_ENV !== 'production') {
    middlewares.push(createLogger());
  }
  middlewares.push(thunk);

  return createStore(
    reducers,
    composeWithDevTools(applyMiddleware(...middlewares))
  );
};

export default configureStore;
