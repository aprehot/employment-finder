import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProject } from './actions';
import AniColumn from '../hoc/aniColumn'
import AniGrid from '../hoc/AniGrid'
import QuickShare from '../../components/quickShare/quickShare'
import ProjectHeader from '../../components/projectHeader/projectHeader'

const ProjectLeftColumn = (props) => (
  <AniColumn Top={ProjectHeader} Bottom={QuickShare} />
)

class ProjectPage extends Component {
  componentDidMount() {
    this.props.dispatch(getProject());
  }

  render() {
    return (
      <AniGrid Left={ProjectLeftColumn} />
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  };
}

export default connect(mapStateToProps)(ProjectPage);
