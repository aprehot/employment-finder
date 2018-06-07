import React from 'react';
import { Helmet } from 'react-helmet';

import AniGrid from '../hoc/AniGrid';
import MyProjects from '../../components/MyProjects/MyProjects';
import VaultColumn from '../../components/vaultColumn/vaultColumn';
import './style.scss';
import axios from 'axios'

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  componentDidMount() {
    axios.get('/api/users').then(response => console.log(response.data));
  }
  render() {
    // console.log(this.props)
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
