/**
 * Create the store with dynamic reducers
 */

import createSagaMiddleware from 'redux-saga';
import { routerMiddleware, routerReducer } from 'react-router-redux';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import rootSaga from './containers/App/rootSaga';
// import promiseMiddleware from 'redux-promise';
import user from './containers/userReducer';
import project from './containers/projectReducer';
import { composeWithDevTools } from 'redux-devtools-extension';

const sagaMiddleware = createSagaMiddleware();


/* eslint-disable */
export default function configureStore(history: any) {
  const middlewares = [
    // promiseMiddleware,
    sagaMiddleware,
    routerMiddleware(history),
  ];

  const enhancers = [
    applyMiddleware(...middlewares),
  ];

  const combinedReducers = combineReducers({
    user,
    project,
    router: routerReducer
  } as any);

  const store = createStore(
    // combineReducers({
    //   route: routerReducer,
    //   user,
    //   project
    // }),
    combinedReducers,
    // composeEnhancers(...enhancers)
    composeWithDevTools(
      ...enhancers
    )
  );

  sagaMiddleware.run(rootSaga);

  return store;
}
