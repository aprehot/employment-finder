/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */
import * as React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import Home from '../../components/Home';
import Header from '../../components/Header';
import Login from '../../containers/Login/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import ProjectPage from '../../containers/ProjectContainer/Loadable';
import VaultDashboard from '../../containers/vaultDashboard/Loadable';

import './style.scss';
// import Auth from '../hoc/auth/auth';

const App: React.SFC = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="Discover ANi"
      defaultTitle="Discover ANi"
    >
      <meta name="Discover ANi" content="The Efficiency Network For Entertainment" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path="/dashboard" component={VaultDashboard} />
      <Route exact path="/project/:id" component={ProjectPage} />
      <Route exact path="/login" component={Login} />
      <Route exact path="/" component={Home} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);


export default App;
