import React, { Component } from 'react';
import './style.scss';

class MyProjects extends Component {
  state = {
    projectType: false
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
            onClick={() => this.setState({ projectType: true })}
            style={{
              background: projectType ? '#8484FF' : '#C9C9FF',
              borderRadius: projectType ? '30px 0 0 0' : '0 0 0 30px',
            }}
            onKeyDown={() => console.log(null)}
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
            onKeyDown={() => console.log(null)}
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
export default MyProjects;

/* <div style={{height: '100%', marginTop: '10px'}} className="grid-x grid-padding-y">
{this.projectDirectory(projects, folders, titles)}
</div> */
