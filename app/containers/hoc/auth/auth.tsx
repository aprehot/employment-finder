import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { authenticateUser } from './actions';
import LoadingIndicator from '../../../components/LoadingIndicator';


interface IProps {
  dispatch: (action: any) => void;
  router: {
    location?: {
      pathname?: string
    }
  };
  user: {
    payload: {
      isAuth: boolean,
      id: string,
      accountType?: Priviledges
    }
  }
}

enum Priviledges { 'Representative', 'Casting Director', 'Producer', 'Executive', 'Actor', 'Writer', 'Director' }

interface IState {
  loading: boolean
}



const Auth: any = (
  ComposedClass: any,
  reload: boolean
) => {

  class AuthenticationCheck extends React.Component<IProps, IState> {

    state: IState = {
      loading: true
    }

    componentDidMount() {
      this.props.dispatch(authenticateUser());
    }

    componentWillReceiveProps(nextProps: any) {
      this.setState({ loading: false });
      console.log(nextProps)
      if (!nextProps.user.payload.isAuth) {
        if (reload) {
          this.props.dispatch(push('/login'))
        }
      } else if (reload === false) {
        this.props.dispatch(push('/dashboard'))
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
  const mapStateToProps = ({ user, router }: IProps) => ({ user, router });

  return connect(mapStateToProps, null)(AuthenticationCheck);
}

export default Auth