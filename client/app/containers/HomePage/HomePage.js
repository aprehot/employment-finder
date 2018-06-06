import React from 'react';
import { Helmet } from 'react-helmet';
import MyProjects from '../../components/MyProjects/MyProjects';
import VaultColumn from '../../components/vaultColumn/vaultColumn';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Helmet>
          <title>Home Page</title>
          <meta name="description" content="A React.js Boilerplate application homepage" />
        </Helmet>
        <article className="grid-x myVault" >
          <div className="cell grid-x large-4">
            <div className="cell large-9 vaultColumn">
              <VaultColumn />
            </div>
          </div>

          <div id="myProjects" className="grid-y large-4 cell align-center">
            <div className="grid-y large-10">
              <MyProjects />
            </div>
          </div>

          <div id="myUpdates" className="grid-y large-4 cell align-center">
            <div className="grid-x large-10">

            </div>
          </div>
        </article>
      </main>
    );
  }
}
