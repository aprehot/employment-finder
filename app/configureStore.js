/**
 * Create the store with dynamic reducers
 */

import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, compose, combineReducers } from 'redux';
import rootSaga from 'containers/App/rootSaga';
// import rootReducer from 'containers/App/rootReducer';
import data from './containers/Gucci/reducers/data';
import loginReducer from './containers/hoc/auth/reducer';

const sagaMiddleware = createSagaMiddleware();

export default function configureStore(state, history) {
  const middlewares = [
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  // If Redux DevTools Extension is installed use it, otherwise use Redux compose
  /* eslint-disable no-underscore-dangle */
  const composeEnhancers =
    process.env.NODE_ENV !== 'production' &&
    typeof window === 'object' &&
    window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__
      ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__({
        // TODO Try to remove when `react-router-redux` is out of beta, LOCATION_CHANGE should not be fired more than once after hot reloading
        // Prevent recomputing reducers for `replaceReducer`
        shouldHotReload: false,
      })
      : compose;
  /* eslint-enable */

  const store = createStore(
    combineReducers({
      route: routerReducer,
      loginReducer,
      data
      // rootReducer
    }),
    composeEnhancers(...enhancers)
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
