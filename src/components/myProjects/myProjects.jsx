import React, { Component } from 'react';

class MyProject extends Component {
  state = {
    projectType: true
  }

  projectDirectory = (data) => (
    data.projects ?
    data.projects.map(project => {
      return (
        <div className="grid-x cell large-10 projectCategories grid-margin-y" key={project.id}>
          <img className="cell shrink projectFolder" alt={project.title} src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png" />
          <div className="cell large-6 projectFolderTitle">{project.folder}</div>
          <br />
        </div>
      )
    })
    : null
  )

  render() {
    console.log(this.props.projects)
    const { projectType } = this.state
    return (
      <div className="grid-x grid-margin-y">
        <div className="myProjectsHeader cell">
          <img alt="Project Folders" src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png" />
          <h2>Projects</h2>
        </div>
        <div className="grid-x projectTypes cell">
          <div
            className="cell large-6 projectType text-center"
            onClick={()=> this.setState({projectType: true})}
            style={{
              background: projectType ? '#8484FF' : '#C9C9FF',
              borderRadius: projectType ? '50px 0 0 0' : '0 0 0 50px',
            }} >
            <h5>
              Company
            </h5>
          </div>
          <div
            className="cell large-6 projectType text-center"
            onClick={()=> this.setState({projectType: false})}
            style={{
              background: projectType ?  '#C9C9FF': '#8484FF',
              borderRadius: projectType ? '0 0 50px 0' : '0 50px 0 0'
            }} >
            <h5>
              Personal
            </h5>
          </div>
          <div className="grid-x align-center">
            {this.projectDirectory(this.props.projects)}
          </div>
        </div>
      </div>
    );
  }
}

export default MyProject;
