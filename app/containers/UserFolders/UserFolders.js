import React, { Component } from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from 'components/LoadingIndicator';

import { getFolders, getContents } from './actions';
import './style.scss';

/* eslint no-underscore-dangle: 0 */
/* eslint no-nested-ternary: 0 */

// OPTIMIZE: Pure Component ?
class UserFolders extends React.Component {
  state = {
    projectType: true,
    activeFolder: ''
  }
  componentDidMount() {
    this.props.dispatch(getFolders());
  }

  // TODO: Find out why querying ownerid of each folder doesnt display just owner folders

  showContents = (folderContents, folder) => (
    folderContents && this.state.activeFolder === folder.folderName ?
      folderContents.projects[0] ?
        <div className="contentContainer">
          {folderContents.projects.map((project) => (
            <h5
              className="folderProjects"
              key={project._id}
            >
              {project.title}
            </h5>
          ))}
        </div>
        :
        <p style={{ color: 'rgb(132, 132, 255)' }}>This folder has no contents.</p>
      :
      null
  )

  showPersonal = (personal, folderContents) => (
    !this.state.projectType && personal.category === 'Personal' ?
      <div
        tabIndex="0"
        role="button"
        key={personal._id}
        className="grid-x cell folder"
        onClick={(e) => {
          this.props.dispatch(getContents(e.target.innerText, 'Personal'));
          this.setState({ activeFolder: e.target.innerText });
        }}
        onKeyPress={(e) => this.props.dispatch(getContents(e.target.innerText, 'Personal'))}
      >
        <img
          alt={personal.folderName}
          className="folderImg cell large-3"
          src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png"
        />
        <h4 className="cell large-9 folderNames">
          <span>{personal.folderName}</span>
        </h4>
        {this.showContents(folderContents, personal)}
      </div>
      : null
  )


  showUserFolders = (folders, folderContents) => (
    folders ?
      folders.map((folder) => (
        this.state.projectType && folder.category === 'Company' ?
          <div
            tabIndex="0"
            role="button"
            key={folder._id}
            className="grid-x cell folder"
            onClick={(e) => {
              this.props.dispatch(getContents(e.target.innerText, 'Company'));
              this.setState({ activeFolder: e.target.innerText });
            }}
            onKeyPress={(e) => this.props.dispatch(getContents(e.target.innerText, 'Company'))}
          >
            <img
              alt={folder.folderName}
              className="folderImg cell large-3"
              src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png"
            />
            <h4 className="cell large-9 folderNames">
              <span>{folder.folderName}</span>
            </h4>
            {this.showContents(folderContents, folder)}
          </div>
          :
          this.showPersonal(folder, folderContents)
      ))
      : <LoadingIndicator />
  )

  render() {
    const { userFolders, folderContents } = this.props.user;
    const { projectType } = this.state;
    console.log(folderContents);
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
              onClick={() => this.setState({ projectType: true })}
              style={{
                background: projectType ? '#8484FF' : '#C9C9FF',
                borderRadius: projectType ? '20px 0 0 0' : '0 0 0 20px',
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
                borderRadius: projectType ? '0 0 20px 0' : '0 20px 0 0'
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
          {this.showUserFolders(userFolders, folderContents)}
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
