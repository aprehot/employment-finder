import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator';

import { auth } from './actions';


export default function (ComposedClass, reload) {
  class AuthenticationCheck extends Component {
    state = {
      loading: true
    }

    componentWillMount() {
      this.props.dispatch(auth());
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ loading: false });
      console.log(nextProps)
      if (!nextProps.user.auth.data.isAuth) {
        if (reload) {
          this.props.history.push('/login');
        }
      } else {
        if (reload === false) {
        this.props.history.push('/');
        }
      }
    }

    render() {
      if (this.state.loading) {
        return <div className="loader"><LoadingIndicator /></div>;
      }
      return (
        <ComposedClass {...this.props} user={this.props.user} />
      );
    }
  }

  function mapStateToProps(state) {
    return {
      user: state.user
    };
  }
  return connect(mapStateToProps)(AuthenticationCheck);
}
