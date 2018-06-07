import React, { Component } from 'react';


class LoginForm extends Component {
  state = {
    email: '',
    password: '',
    error: '',
    success: false
  }

  componentDidMount() {
    // this.props.requestApiData()
  }

  handleInputEmail = (event) => {
    this.setState({ email: event.target.value });
  }
  handleInputPassword = (event) => {
    this.setState({ password: event.target.value });
  }

  submitForm = (e) => {
    e.preventDefault();
  }

  render() {
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
            <h1>{console.log(this.props)}</h1>
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

export default LoginForm;
