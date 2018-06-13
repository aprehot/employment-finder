import React from 'react';
import { Helmet } from 'react-helmet';

import AniGrid from '../hoc/aniGrid';
import UserFolders from '../UserFolders/Loadable';
import AniColumn from '../hoc/aniColumn';
import UserUpdates from '../UserUpdates/Loadable';
import QuickShare from '../../components/quickShare/quickShare';
import SearchVault from '../../components/searchVault/searchVault';
import './style.scss';

const DashColumn = () => (
  <AniColumn Top={SearchVault} Bottom={QuickShare} />
)

// OPTIMIZE: React.PureComponent
export default class VaultDashboard extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <main>
        <Helmet>
          <title>VaultDashboard</title>
          <meta name="description" content="Discover ANi VaultDashboard" />
        </Helmet>
        <AniGrid Left={DashColumn} Middle={UserFolders} Right={UserUpdates} />
      </main>
    );
  }
}
