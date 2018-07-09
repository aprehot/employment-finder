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
      <div className='cell large-5 grid-container grid-x grid-padding-y projectViewCards'>
        <h3 className='cell roleHead'>Roles</h3>
        {projectData && projectData.roles.map((role: IProjectItem, i: number) => (
          <div key={`${role._id}${i}`} className="cell large-6">
            <h3 className='roleTitle'>{role.name}</h3>
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
        )
        )
        }
      </div>
    );
  }
}

const mapStateToProps = ({ project }: IProject) => ({ project });


export default connect(mapStateToProps)(Roles);
