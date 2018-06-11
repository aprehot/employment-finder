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

class ProjectPage extends Component {


  componentDidMount() {
    this.props.dispatch(getProject());
  }

  render() {
    return (
    this.props.project.projectData ? <AniGrid Left={ProjectLeftColumn} Middle={ProjectStory} Right={ProjectTeam} /> : null
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  };
}

export default connect(mapStateToProps)(ProjectPage);
