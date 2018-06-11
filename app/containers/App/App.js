/**
 *
 * App
 *
 * This component is the skeleton around the actual pages, and should only
 * contain code that should be seen on all pages. (e.g. navigation bar)
 */

import React from 'react';
import { Helmet } from 'react-helmet';
import { Switch, Route } from 'react-router-dom';

import VaultDashboard from 'containers/vaultDashboard/Loadable';
import Login from 'containers/Login/Loadable';
import NotFoundPage from 'containers/NotFoundPage/Loadable';
import Header from 'components/Header';
import Home from 'components/Home';
import ProjectPage from 'containers/ProjectContainer/Loadable';

import './style.scss';
import Auth from '../hoc/auth/auth';

const App = () => (
  <div className="app-wrapper">
    <Helmet
      titleTemplate="Discover ANi"
      defaultTitle="Discover ANi"
    >
      <meta name="Discover ANi" content="The Efficiency Network For Entertainment" />
    </Helmet>
    <Header />
    <Switch>
      <Route exact path="/dashboard" component={Auth(VaultDashboard, true)} />
      <Route exact path="/project/:id" component={Auth(ProjectPage, true)} />
      <Route exact path="/login" component={Auth(Login, false)} />
      <Route exact path="/" component={Auth(Home, null)} />
      <Route path="" component={NotFoundPage} />
    </Switch>
  </div>
);

export default App;
