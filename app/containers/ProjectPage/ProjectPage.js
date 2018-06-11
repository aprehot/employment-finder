import React, { Component } from 'react';
import { connect } from 'react-redux';

import { getProject } from './actions';


class ProjectPage extends Component {
  componentDidMount() {
    this.props.dispatch(getProject());
  }

  render() {
    return (
      <div></div>
    );
  }
}

function mapStateToProps(state) {
  return {
    project: state.project
  };
}

export default connect(mapStateToProps)(ProjectPage);
