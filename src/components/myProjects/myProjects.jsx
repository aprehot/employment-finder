import React, { Component } from 'react';

class MyProject extends Component {
  state = {
    projectType: true
  }

  render() {
    const { projectType } = this.state
    return (
      <div className="grid-x grid-margin-y">
        <div className="myProjectsHeader cell">
          <img alt="Project Folders" src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png" />
          <h2>Projects</h2>
        </div>
        <div className="grid-x projectTypes cell">
          <div
            className="cell large-6 projectType"
            onClick={()=> this.setState({projectType: true})}
            style={{
              background: projectType ? '#8484FF' : '#C9C9FF',
              borderRadius: projectType ? '0 0 0 50px': '50px 0 0 0'
            }} >
          </div>
          <div
            className="cell large-6 projectType"
            onClick={()=> this.setState({projectType: false})}
            style={{
              background: projectType ?  '#C9C9FF': '#8484FF',
              borderRadius: projectType ? '0 50px 0 0': '0 0 50px 0'
            }} ></div>
        </div>
      </div>
    );
  }
}

export default MyProject;
