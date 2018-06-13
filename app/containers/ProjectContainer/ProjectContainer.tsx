import React, { Component } from 'react';
import { connect } from 'react-redux';
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

// COMBAK: : REDIRECT USER IF PAGE REFERESHES WHILE IN PROJECT PAGE

interface IProps {
  dispatch: any,
  project: {
    projectData: any[]
  }
}

class ProjectPage extends Component<IProps> {


  componentDidMount() {
    this.props.dispatch(getProject());
  }

  render() {
    const { projectData } = this.props.project
    return (
      projectData ? <AniGrid Left={ProjectLeftColumn} Middle={ProjectStory} Right={ProjectTeam} /> : null
    );
  }
}

const mapStateToProps = ({project}:IProps) => ({project})

export default connect(mapStateToProps)(ProjectPage);
