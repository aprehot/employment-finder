import React from 'react';
import { Helmet } from 'react-helmet';

import AniGrid from '../hoc/AniGrid';
import UserFolders from '../UserFolders/Loadable';
import VaultColumn from '../hoc/vaultColumn';
import UserUpdates from '../UserUpdates/Loadable';
import QuickShare from '../../components/quickShare/quickShare';
import SearchVault from '../../components/searchVault/searchVault';
import './style.scss';

const DashColumn = () => (
  <VaultColumn Top={SearchVault} Bottom={QuickShare} />
)

// OPTIMIZE: React.PureComponent
export default class Dashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Helmet>
          <title>Dashboard</title>
          <meta name="description" content="Discover ANi Dashboard" />
        </Helmet>
        <AniGrid Left={DashColumn} Middle={UserFolders} Right={UserUpdates} />
      </main>
    );
  }
}
