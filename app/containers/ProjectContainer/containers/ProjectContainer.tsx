import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


import { getProject } from '../actions';
import AniColumn from '../../hoc/aniColumn';
import AniGrid from '../../hoc/aniGrid';
import QuickShare from '../../../components/quickShare/quickShare';
import ProjectHeader from '../../../components/projectHeader/projectHeader';
import ProjectStory from '../../../components/projectStory/projectStory';
import ProjectTeam from '../../../components/projectTeam/projectTeam';
import { IReduxProps } from '../../userPost/projectInterface';
import UserUpdates from '../../UserUpdates';
import '../styles.scss'

const mapStateToProps = ({ project, router }: IReduxProps) => ({ project, router })

@(connect(mapStateToProps, null) as any)
export default class ProjectPage extends Component<IReduxProps> {


  componentDidMount() {
    const { project, dispatch } = this.props;
    if (!project.projectId) {
      dispatch(push('/dashboard'));
    }
  }



  render() {
    const { projectData } = this.props.project
    return (
      projectData ?
        <div className="grid-x projectPageContainer">
          <div className="cell projectViewNav">
            <button
              onClick={() => this.props.dispatch(push('/dashboard'))}
              className="projectViewBtn shrink projectBackBtn button tertiary" ></button>
            <button className="projectViewBtn shrink projectFilterBtn button tertiary" ></button>
            <input type='text' className='projectViewSearch' placeholder="Search" />
          </div>
          <ProjectHeader />
          <UserUpdates />
        </div>
        :
        null
    );
  }
}
