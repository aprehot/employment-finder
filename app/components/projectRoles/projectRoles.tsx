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
  roleType?: string,
  ages?: [number]
}

enum Gender { 'Male', 'Female' }

class Roles extends React.PureComponent<IProject, IState> {
  state: IState = {
    projectType: true
  }
  render() {
    const { projectType } = this.state;
    const { projectData }: IContent = this.props.project;
    return (
      // <div className="grid-y large-10 folderContainer">
      //   <div className="myProjectsHeader cell">
      //     <img alt="Project Folders" src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png" />
      //     <h2>Story</h2>
      //   </div>
      //   <div className="grid-x projectTypes cell" >
      //     <div
      //       role="button"
      //       tabIndex={0}
      //       className="cell large-6 projectType text-center"
      //       onClick={() => this.setState({ projectType: true })}
      //       style={{
      //         background: projectType ? '#8484FF' : '#C9C9FF',
      //         borderRadius: projectType ? '20px 0 0 0' : '0 0 0 20px',
      //       }}
      //     >
      //       <h5>Premise</h5>
      //     </div>
      //     <div
      //       role="button"
      //       tabIndex={0}
      //       className="cell large-6 projectType text-center"
      //       onClick={() => this.setState({ projectType: false })}
      //       style={{
      //         background: projectType ? '#C9C9FF' : '#8484FF',
      //         borderRadius: projectType ? '0 0 20px 0' : '0 20px 0 0'
      //       }}
      //     >
      //       <h5> Characters </h5>
      //     </div>
      //   </div>
      <div className='cell large-5 grid-container grid-x grid-padding-y'>
        <h3 className='cell'>Roles</h3>
        {projectData && projectData.roles.map((role: IProjectItem, i: number) => (
          <div key={`${role._id}${i}`} className="cell large-6">
            <div className="">
              <h3><b style={{ color: '#565284' }}>{role.name}</b></h3>
              {console.log(role)}
              <div className="grid-x " >
                <h6 className='cell large-6 roleDetails'>
                  {`${role.roleType} ${role.gender}`}
                </h6>
                <h6 className='cell large-6 roleDetails'>
                  {`${role.minAge || role.ages[0]}-${role.maxAge || role.ages[1]}`}
                </h6>
              </div>
              <p>{role.description}</p>
            </div>
          </div>
        )
        )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ project }: IProject) => ({ project });


export default connect(mapStateToProps)(Roles);
