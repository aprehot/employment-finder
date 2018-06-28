import * as React from 'react';
import { Switch, Route } from 'react-router-dom';

import Home from '../../components/Home';
import Header from '../../components/Header';
import Login from '../../containers/Login/Loadable';
import NotFoundPage from '../../containers/NotFoundPage/Loadable';
import ProjectPage from '../../containers/ProjectContainer/Loadable';
import ProjectStacks from '../ProjectStacks/Loadable';
import PostingContainer from '../../containers/userPost/PostingContainer';
import WithDrag from '../ProjectStacks/container/dragBox'
import { Gucci } from '../ProjectStacks/container/dragBox'

import './style.scss';
import Auth from '../hoc/auth/auth';

const App: React.SFC = () => (
  <div className="app-wrapper">
    <Header />
    <main id="ANiMain">
      <Switch>
        <Route exact path="/dashboard" component={Auth(ProjectStacks, true)} />
        <Route exact path="/gucciprada" component={WithDrag(Gucci)} />
        <Route exact path="/project/:id" component={Auth(ProjectPage, true)} />
        <Route exact path="/add" component={Auth(PostingContainer, true)} />
        <Route exact path="/login" component={Auth(Login, false)} />
        <Route exact path="/" component={Auth(Home, null)} />
        <Route path="" component={NotFoundPage} />
      </Switch>
    </main>
  </div>
);


export default App;
