import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { loginUser } from './actions';
import './style.scss';

export interface IProps {
  dispatch?: (action: any) => void;
  router: {
    location?: {
      pathname?: string
    }
  };
  user: {
    payload: {
      isAuth: boolean,
      id?: string,
      message?: string
    },
    userFolders: any
  };
  project?: {
    projectType: string,
    projectStart: Date,
    projectEnd: Date,
    projectRoles: {}[],
    activeBtn: number
  }
}
interface IState {
  email: string;
  password: string;
  user?: IProps['user'];
  isAuth?: boolean | null;
}


const mapStateToProps = ({ user, router }: IProps) => ({ user, router })

@(connect(mapStateToProps, null) as any)
export default class LoginForm extends React.PureComponent<IProps, IState> {

  state: IState = {
    email: '',
    password: '',
  }


  componentDidUpdate(prevProps: IProps) {
    if (prevProps.user !== this.props.user) {
      const { user } = this.props
      return user &&
        user.payload.isAuth ?
        this.props.dispatch(push('/dashboard'))
        :
        console.log('not authorized')
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
                  user.payload ?
                    <div> {user.payload.message} </div>
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