import React, { Component } from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';


import { getProject } from './actions';
import AniColumn from '../hoc/aniColumn';
import AniGrid from '../hoc/aniGrid';
import QuickShare from '../../components/quickShare/quickShare';
import ProjectHeader from '../../components/projectHeader/projectHeader';
import ProjectStory from '../../components/projectStory/projectStory';
import ProjectTeam from '../../components/projectTeam/projectTeam';

const ProjectLeftColumn = () => (
  <AniColumn Top={ProjectHeader} Bottom={QuickShare} />
);

interface IProps {
  dispatch: (action: any) => void,
  project: any,
  router: any
}

const mapStateToProps = ({ project, router }: IProps) => ({ project, router })

@(connect(mapStateToProps, null) as any)
export default class ProjectPage extends Component<IProps> {


  componentDidMount() {
    const { project, dispatch } = this.props;
    if (!project.projectId) {
      dispatch(push('/dashboard'));
    }
  }


  render() {
    const { projectData } = this.props.project
    return (
      projectData ? <AniGrid Left={ProjectLeftColumn} Middle={ProjectStory} Right={ProjectTeam} /> : null
    );
  }
}
