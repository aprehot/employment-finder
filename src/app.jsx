import React, { Component } from 'react';
import {Route,Switch} from 'react-router-dom';

import Header from './components/header/header';
import ProjectPage from './components/projectPage/projectPage';

import MyVault from './containers/vault/vault';

class App extends Component {
  render() {
    return (
			<div style={{background: 'white'}}>
				<Route key="header" component={Header}/>
        <Switch>
          <Route exact path="/" component={MyVault} />
          <Route exact path="/project/:id" component={ProjectPage} />
        </Switch>
      </div>
    );
  }
}

export default App;
