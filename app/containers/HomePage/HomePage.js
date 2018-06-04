/*
 * HomePage
 *
 * This is the first thing users see of our App, at the '/' route
 */

import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import ReposList from 'components/ReposList';
import MyProjects from '../../components/MyProjects/MyProjects';
import VaultColumn from '../../components/vaultColumn/vaultColumn';
import './style.scss';

export default class HomePage extends React.PureComponent { // eslint-disable-line react/prefer-stateless-function
  /**
   * when initial state username is not null, submit the form to load repos
   */
  componentDidMount() {
    if (this.props.username && this.props.username.trim().length > 0) {
      this.props.onSubmitForm();
    }
  }

  render() {
    const { loading, error, repos } = this.props;
    const reposListProps = {
      loading,
      error,
      repos,
    };

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
              <MyProjects
              />
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

HomePage.propTypes = {
  loading: PropTypes.bool,
  error: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.bool,
  ]),
  repos: PropTypes.oneOfType([
    PropTypes.array,
    PropTypes.bool,
  ]),
  onSubmitForm: PropTypes.func,
  username: PropTypes.string,
  onChangeUsername: PropTypes.func,
};
