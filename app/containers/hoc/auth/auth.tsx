import * as React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';

import { authenticateUser } from './actions';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { IReduxProps } from '../../userPost/projectInterface';


enum Priviledges { 'Representative', 'Casting Director', 'Producer', 'Executive', 'Actor', 'Writer', 'Director' }

interface IState {
  loading: boolean
}



const Auth: any = (
  ComposedClass: any,
  reload: boolean
) => {

  class AuthenticationCheck extends React.Component<IReduxProps, IState> {

    state: IState = {
      loading: true
    }

    componentDidMount() {
      !this.props.user.payload
        ?
        this.props.dispatch(authenticateUser())
        :
        this.setState({ loading: false })
    }

    componentDidUpdate(prevProps: any) {
      const { user } = this.props;
      if (prevProps !== this.props) {
        if (reload && user.payload.error) {
          this.setState({ loading: false })
          this.props.dispatch(push('/login'))
        } else if (reload === false) {
          this.setState({ loading: false })
          this.props.dispatch(push('/'))
        } else {
          this.setState({ loading: false })
        }
        // else if (reload === true) {
        //   this.setState({ loading: false })
        // }
      }
    }

    // componentWillReceiveProps(nextProps: any) {
    //   this.setState({ loading: false });
    //   if (!nextProps.user.payload.isAuth) {
    //     if (reload) {
    //       this.props.dispatch(push('/login'))
    //     }
    //   } else if (reload === false) {
    //     this.props.dispatch(push('/dashboard'))
    //   }
    // }

    render() {
      if (this.state.loading) {
        return <div className="loader"><LoadingIndicator /></div>;
      }
      return (
        <ComposedClass {...this.props} user={this.props.user} />
      );
    }
  }
  const mapStateToProps = ({ user, router }: IReduxProps) => ({ user, router });

  return connect(mapStateToProps, null)(AuthenticationCheck);
}

export default Auth