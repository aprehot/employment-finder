import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator';

import { getFolders, getContents } from './actions';
import './style.scss';

/* eslint no-underscore-dangle: 0 */

// OPTIMIZE: Pure Component ?
class UserFolders extends React.Component {
  state = {
    projectType: true,
    category: 'Company'
  }
  componentDidMount() {
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
        <h4 className="cell large-9 folderNames">
          <span>{personal.folderName}</span>
        </h4>
      </div>
      : null
  )


  showUserFolders = (folders) => (
    folders ?
      folders.map((folder) => (
        this.state.projectType && folder.category === 'Company' ?
          <div
            key={folder._id}
            role="button"
            tabIndex="0"
            className="grid-x cell folder"
            onClick={(e) => this.props.dispatch(getContents(e.target.innerText, this.state.category))}
            onKeyPress={(e) => this.props.dispatch(getContents(e.target.innerText, this.state.category))}
          >
            <img
              alt={folder.folderName}
              className="folderImg cell large-3"
              src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png"
            />
            <h4 className="cell large-9 folderNames">
              <span>{folder.folderName}</span>
            </h4>
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
      <div className="grid-y large-10 folderContainer">
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
              onClick={() => this.setState({ projectType: true, category: 'Company' })}
              style={{
                background: projectType ? '#8484FF' : '#C9C9FF',
                borderRadius: projectType ? '20px 0 0 0' : '0 0 0 20px',
              }}
              onKeyDown={() => this.setState({ projectType: true, category: 'Company' })}
            >
              <h5>
                Company
              </h5>
            </div>
            <div
              role="button"
              tabIndex="0"
              className="cell large-6 projectType text-center"
              onClick={() => this.setState({ projectType: false, category: 'Personal' })}
              style={{
                background: projectType ? '#C9C9FF' : '#8484FF',
                borderRadius: projectType ? '0 0 20px 0' : '0 20px 0 0'
              }}
              onKeyDown={() => this.setState({ projectType: false, category: 'Personal' })}
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
