import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getFolders } from './actions';
import './style.scss';

class UserFolders extends Component {
  // static getDerivedStateFromProps(props, state) {
  //   this.props.dispatch(getUserFolders())
  // }
  state = {
    projectType: 'Company'
  }
  componentWillMount() {
    // this.props.dispatch(getFolders(this.state.projectType))
  }

  render() {
    const { projectType } = this.state;
    return (
      <div className="grid-x grid-margin-y">
        <div className="myProjectsHeader cell">
          <img alt="Project Folders" src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png" />
          <h2>Projects</h2>
        </div>
        <div className="grid-x projectTypes cell">
          <div
            role="button"
            tabIndex="0"
            className="cell large-6 projectType text-center"
            onClick={() => this.setState({ projectType: 'Company' })}
            style={{
              background: projectType ? '#8484FF' : '#C9C9FF',
              borderRadius: projectType ? '30px 0 0 0' : '0 0 0 30px',
            }}
            // onKeyDown={() => this.setState({ projectType: 'Company' })}
          >
            <h5>
              Company
            </h5>
          </div>
          <div
            role="button"
            tabIndex="0"
            className="cell large-6 projectType text-center"
            onClick={() => this.setState({ projectType: 'Personal' })}
            style={{
              background: projectType ? '#C9C9FF' : '#8484FF',
              borderRadius: projectType ? '0 0 30px 0' : '0 30px 0 0'
            }}
            // onKeyDown={() => this.setState({ projectType: 'Personal' })}
          >
            <h5>
              Personal
            </h5>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state) {
  console.log(state)
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(UserFolders);
