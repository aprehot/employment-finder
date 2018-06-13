import * as React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import DownArrow from './downArrow';


interface IState {
  projectType: boolean;
}

interface IProject {
  project: IContent
}

interface IContent {
  projectData: {
    premise: string,
    roles: IProjectItem[]
  }
}

interface IProjectItem {
  _id: string,
  name: string,
  minAge: number,
  maxAge: number,
  description?: string,
  isOpen?: boolean,
  gender?: Gender,
  roleType?: string
}

enum Gender { 'Male', 'Female' }

class ProjectStory extends React.Component<IProject, IState> {
  state: IState = {
    projectType: true
  }
  render() {
    const { projectType } = this.state;
    const { projectData }: IContent = this.props.project;
    return (
      <div className="grid-y large-10 folderContainer">
        <div className="myProjectsHeader cell">
          <img alt="Project Folders" src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png" />
          <h2>Story</h2>
        </div>
        <div className="grid-x projectTypes cell" >
          <div
            role="button"
            tabIndex={0}
            className="cell large-6 projectType text-center"
            onClick={() => this.setState({ projectType: true })}
            style={{
              background: projectType ? '#8484FF' : '#C9C9FF',
              borderRadius: projectType ? '20px 0 0 0' : '0 0 0 20px',
            }}
          >
            <h5>Premise</h5>
          </div>
          <div
            role="button"
            tabIndex={0}
            className="cell large-6 projectType text-center"
            onClick={() => this.setState({ projectType: false })}
            style={{
              background: projectType ? '#C9C9FF' : '#8484FF',
              borderRadius: projectType ? '0 0 20px 0' : '0 20px 0 0'
            }}
          >
            <h5> Characters </h5>
          </div>
        </div>
        {projectData.roles && projectType ?
          <h5 style={{ padding: '25px 0' }}>{projectData.premise}</h5>
          :
          projectData.roles.map((role: IProjectItem, i: number) => (
            <div key={`${role._id}${i}`} className="grid-x roleContainer">
              <div className="cell large-10">
                <h4>{role.name}</h4>
                <div className="roleInfo">
                  <h6>{role.roleType}</h6>
                  <h6>{role.gender}</h6>
                  <h6>{`${role.minAge}-${role.maxAge}`}</h6>
                </div>
              </div>
              <div className="cell large-2 downArrow">
                <DownArrow />
              </div>
              <hr className="roleHR"></hr>
            </div>
          )
          )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ project }: IProject) => ({ project });


export default connect(mapStateToProps)(ProjectStory);
