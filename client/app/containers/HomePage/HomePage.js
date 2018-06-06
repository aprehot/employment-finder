import React from 'react';
import { Helmet } from 'react-helmet';

import AniGrid from '../hoc/AniGrid';
import MyProjects from '../../components/MyProjects/MyProjects';
import VaultColumn from '../../components/vaultColumn/vaultColumn';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Discover ANi Dashboard" />
        </Helmet>
        <AniGrid Left={VaultColumn} Middle={MyProjects} />
      </main>
    );
  }
}
