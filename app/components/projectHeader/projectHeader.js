import React from 'react';
import { connect } from 'react-redux';
import './styles.scss';

const ProjectHeader = ({ project }) => {
  const { projectData } = project;
  return (
    <div className="cell large-11 grid-x align-center">
      <div className="large-11 projectHeader grid-padding-y">
        <h1 className="cell large-12 projTitle">{projectData.title}</h1>
        <h2 className="cell projTitle">{projectData.projectType}</h2>
        <h5 className="grid-x align-middle">
          <span role="img" className="cell large-2 unic" aria-label="start and end date" >
              &#128197;
          </span>
          <span className="cell large-5">{`Start Date: ${projectData.startDate}`}</span>
          <span className="cell large-5">{`Wrap Date: ${projectData.wrapDate}`}</span>
        </h5>
        <h5 style={{ width: '100%' }} className="grid-x align-middle">
          <span className="cell large-2 unic" role="img" aria-label="location">
              📌
          </span> {`${projectData.location}, USA`}
        </h5>
        <div className="projectDetails">
          <h5>
            <span className="unic" role="img" aria-label="budget">&#128176;</span>
            <span> {`${projectData.budget.substring(1, 3)}M`}</span>
          </h5>
          <h5>
            <span className="unic" role="img" aria-label="Castingdirector">&#127909;</span>
            <span> {projectData.hasCD ? 'yes' : 'no'}</span>
          </h5>
          <h5 className="grid-x align-middle">
            <img
              className="unic"
              alt="quick share"
              src="https://s3-us-west-1.amazonaws.com/anidemo/anicloud%402x.png"
            />
            <span> {projectData.security}</span>
          </h5>
        </div>
      </div>
    </div>

  );
};

function mapStateToProps(state) {
  return {
    project: state.project
  };
}

export default connect(mapStateToProps)(ProjectHeader);
