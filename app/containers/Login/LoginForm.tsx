import * as React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { loginUser } from './actions';
import './style.scss';

interface IProps {
  dispatch: any,
  user: {
    login: {
      isAuth: boolean,
      message?: string
    }
  }
}
interface IState {
  email: string;
  password: string;
  error?: string;
  success?: boolean;
}

class LoginForm extends React.Component<IProps, IState> {

  static contextTypes = {
    router: PropTypes.object
  }

  state: IState = {
    email: '',
    password: '',
    error: '',
    success: false
  }


  componentWillReceiveProps(nextProps: IProps) {
    const { isAuth } = nextProps.user.login
    if (isAuth) {
      this.context.router.history.push('/dashboard');
    }
  }

  handleInputEmail = (e: React.FormEvent<HTMLInputElement>) => {
    const { value }: any = e.target
    this.setState({
      email: value
    });
  }
  handleInputPassword = (e: React.FormEvent<HTMLInputElement>) => {
    const { value }: any = e.target
    this.setState({
      password: value
    });
  }

  submitForm = (e: React.FormEvent) => {
    e.preventDefault();
    this.props.dispatch(loginUser(this.state));
  }


  render() {
    console.log(this.state)
    const { user } = this.props;
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


const mapStateToProps = ({ user }: IProps) => ({ user })

export default connect(mapStateToProps)(LoginForm);
