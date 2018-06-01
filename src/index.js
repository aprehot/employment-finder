import React from 'react';
import ReactDOM from 'react-dom';
import App from './app'
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter } from 'react-router-dom'
import { createStore, applyMiddleware } from 'redux';
import './components/bundle.scss';
import { Provider } from 'react-redux';


// import thunk from 'redux-thunk'
// const createStoreWithMiddleware = applyMiddleware()(createStore);

import reducers from './reducers';
const store = createStore(reducers);


ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
    ,document.getElementById('root'));
registerServiceWorker();
