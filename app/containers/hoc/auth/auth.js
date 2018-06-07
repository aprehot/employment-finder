import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator';
import PropTypes from 'prop-types';
import { auth } from '../../Login/actions';


export default function (ComposedClass, reload) {
  class AuthenticationCheck extends Component {

    static contextTypes = {
       router: PropTypes.object
     }
    state = {
      loading: true
    }

    componentWillMount() {
      this.props.dispatch(auth());
    }

    componentWillReceiveProps(nextProps) {
      this.setState({ loading: false });

      if (!nextProps.user.login.isAuth) {
        if (reload) {
          this.context.router.history.push("/login");
        }
      } else if (reload === false) {
        this.context.router.history.push("/dashboard");
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
