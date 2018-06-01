import React, { Component } from 'react';
// import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import JSON from '../../db.json';
import DropDown from '../dropDown/dropDown';
import { getProjects, parseFolders, parseTitles } from '../../actions';

class MyProject extends Component {

  state = {
  projectType: true
}

componentWillMount(){
this.props.parseFolders(JSON)
this.props.getProjects(JSON)
}

projectDirectory = (projects, folders, titles) => (
projects && folders ?
folders.map((folder,i) => {
return (
  <div
    key={i}
    className="grid-x cell large-11 projectCategories"
    >
      <div className="cell large-2">
        <img
          alt={folder}
          className="projectFolder"
          src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png"
        />
      </div>
      <h4
        onClick={(e) => this.props.parseTitles(projects, e.target.textContent)}
        className="auto cell projectFolderTitle">{folder}</h4>
        {titles ?
          folder === titles[0].folder
          ? <DropDown titles={titles} />
          : null : null}
        </div>
      )}
    )
    : null
  )

  render() {
    console.log()
    const { projectType } = this.state
    const { projects, folders, titles } = this.props.projects
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
              borderRadius: projectType ? '30px 0 0 0' : '0 0 0 30px',
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
              borderRadius: projectType ? '0 0 30px 0' : '0 30px 0 0'
            }} >
            <h5>
              Personal
            </h5>
          </div>
          <div style={{height: '100%', marginTop: '10px'}} className="grid-x grid-padding-y">
            {this.projectDirectory(projects, folders, titles)}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    projects: state.projects,
    folders:state.folders,
    titles: state.titles,
    correctPage: state.correctPage
  }
}

export default connect(mapStateToProps, {getProjects, parseFolders, parseTitles})(MyProject);
