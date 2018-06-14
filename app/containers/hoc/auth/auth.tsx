import * as React from 'react';
import { connect } from 'react-redux';

import LoadingIndicator from '../../../components/LoadingIndicator';
import PropTypes from 'prop-types';
import { auth } from '../../Login/actions';


interface IProps {
  dispatch: (action: any) => void;
  user: {
    login: {
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

const Auth = (ComposedClass:any, reload:boolean) => {
  class AuthenticationCheck extends React.Component<IProps, IState> {
    static contextTypes = {
      router: PropTypes.object
    }

    state: IState = {
      loading: true
    }
  
    componentWillMount() {
      this.props.dispatch(auth());
    }

    componentWillReceiveProps(nextProps:any) {
      this.setState({ loading: false });

      if (!nextProps.user.login.isAuth) {
        if (reload) {
          this.context.router.history.push('/login');
        }
      } else  if (reload === false) {
        this.context.router.history.push('/dashboard')
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

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   auth: () => dispatch(auth()),
// });

  const mapStateToProps = ({user}:IProps) => ({user})
  
  
  return connect(mapStateToProps, null)(AuthenticationCheck);
}

export default Auth