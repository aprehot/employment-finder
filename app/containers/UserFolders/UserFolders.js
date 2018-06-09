import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator';

import { getFolders } from './actions';
import './style.scss';

/* eslint no-underscore-dangle: 0 */

// OPTIMIZE: Pure Component ?
class UserFolders extends Component {
  state = {
    projectType: true
  }
  componentWillMount() {
    this.props.dispatch(getFolders());
  }


  showPersonal = (personal) => (
    !this.state.projectType && personal.category === 'Personal' ?
      <div key={personal._id} className="grid-x cell folder">
        <img
          alt={personal.folderName}
          className="folderImg cell large-3"
          src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png"
        />
        <h4 className="cell large-9 folderNames">{personal.folderName}</h4>
      </div>
      : null
  )

  showUserFolders = (folders) => (
    folders ?
      folders.userFolders.map((folder) => (
        this.state.projectType && folder.category === 'Company' ?
          <div key={folder._id} className="grid-x cell folder">
            <img
              alt={folder.folderName}
              className="folderImg cell large-3"
              src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png"
            />
            <h4 className="cell large-9 folderNames">{folder.folderName}</h4>
          </div>
          :
          this.showPersonal(folder)
      ))
      : <LoadingIndicator />
  )

  render() {
    const { userFolders } = this.props.user;
    const { projectType } = this.state;
    return (
      <div className="grid-y large-10" style={{ border: 'solid red 2px' }}>
        <div className="grid-x" >
          <div className="myProjectsHeader cell">
            <img alt="Project Folders" src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png" />
            <h2>Projects</h2>
          </div>
          <div className="grid-x projectTypes cell" >
            <div
              role="button"
              tabIndex="0"
              className="cell large-6 projectType text-center"
              onClick={() => this.setState({ projectType: true })}
              style={{
                background: projectType ? '#8484FF' : '#C9C9FF',
                borderRadius: projectType ? '30px 0 0 0' : '0 0 0 30px',
              }}
              onKeyDown={() => this.setState({ projectType: true })}
            >
              <h5>
                Company
              </h5>
            </div>
            <div
              role="button"
              tabIndex="0"
              className="cell large-6 projectType text-center"
              onClick={() => this.setState({ projectType: false })}
              style={{
                background: projectType ? '#C9C9FF' : '#8484FF',
                borderRadius: projectType ? '0 0 30px 0' : '0 30px 0 0'
              }}
              onKeyDown={() => this.setState({ projectType: false })}
            >
              <h5>
                Personal
              </h5>
            </div>
          </div>
        </div>
        <div className="grid-x folderDir">
          {this.showUserFolders(userFolders)}
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

export default connect(mapStateToProps)(UserFolders);
