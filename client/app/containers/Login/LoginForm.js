import React, { Component } from 'react';
import { connect } from 'react-redux';

class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    success: false
  }

  handleInputEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  handleInputPassword = (event) => {
    this.setState({ password: event.target.value });
  }

  render() {
    return (
      <div className="grid-container grid-padding-y grid-y grid-frame" >
        <div className="large-4 grid-x cell align-center">
          <form className="grid-x large-10 log-in-form" >
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
            <p className="text-center">
              <a href="#">Forgot your password?</a>
            </p>
          </form>
        </div>
      </div>
    );
  }
}

// export default connect(null, { submit: createUserRequest } )(LoginForm);
export default (LoginForm);
