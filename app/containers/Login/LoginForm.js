import React, { Component } from 'react';
import { connect } from 'react-redux';
import { browserHistory } from 'react-router-dom'
import PropTypes from "prop-types";

import {loginUser} from './actions';
// import { loginRequest } from './actions';
import './style.scss'
import { auth } from '../hoc/auth/actions';
import { withRouter } from 'react-router-dom';

class LoginForm extends Component {
  static contextTypes = {
     router: PropTypes.object
   }

  state = {
    email: '',
    password: '',
    error: '',
    success: false
  }


  componentWillReceiveProps (nextProps){
  if(nextProps.user.login.isAuth){
    this.context.router.history.push("/dashboard");
  }
}

  handleInputEmail = (event) => {
    this.setState({ email: event.target.value });
  }

  handleInputPassword = (event) => {
    this.setState({ password: event.target.value });
  }

  submitForm = (e) => {
    e.preventDefault();
    this.props.dispatch(loginUser(this.state));
  }


  render() {
    const { user } = this.props
    return (
      <div className="grid-container grid-padding-y grid-y grid-frame" >
        <div className="large-4 grid-x cell align-center">
          <form className="grid-x large-10 log-in-form" onSubmit={this.submitForm} >
            <h2 className="text-center">Log in</h2>
            <input
              type="email"
              placeholder="somebody@example.com"
              value={this.state.email}
              onChange={this.handleInputEmail}
            />
            <input
              type="password"
              placeholder="Password"
              value={this.state.password}
              onChange={this.handleInputPassword}
            />
            <p className="large-12 cell">
              <input
                type="submit"
                className="button shrink primary"
                value="Log in"
              />
            </p>
            <div className="text-center">
              <a href="#">Forgot your password?</a>
              <div className="error">
                {
                  user.login ?
                    <div> {user.login.message} </div>
                    : null
                }
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.user
  };
}


// LoginForm = connect(mapStateToProps)(LoginForm)
// export default connect(mapStateToProps)(LoginForm);
export default connect(mapStateToProps)(LoginForm)
