import * as React from 'react';
import { connect } from 'react-redux';
import './styles.scss';

interface IProps {
  project: any
}

const shortenNumber = (num: number, decimalPlaces = 0) => {
  var str,
    suffix = '';

  decimalPlaces = decimalPlaces;
  num = +num;

  var factor = Math.pow(10, decimalPlaces);
  //99999 -> 99.9K

  if (num < 1000) {
    str = num;
  } else if (num < 1000000) {
    str = Math.floor(num / (1000 / factor)) / factor;
    suffix = 'K';
  } else if (num < 1000000000) {
    str = Math.floor(num / (1000000 / factor)) / factor;
    suffix = 'M';
  } else if (num < 1000000000000) {
    str = Math.floor(num / (1000000000 / factor)) / factor;
    suffix = 'B';
  } else if (num < 1000000000000000) {
    str = Math.floor(num / (1000000000000 / factor)) / factor;
    suffix = 'T';
  }
  return str + suffix;
}


const ProjectHeader: React.SFC<IProps> = ({ project }: any) => {
  const { projectData } = project;
  return (
    <div className="cell large-12 grid-x align-center">
      <div className="large-11 projectHeader ">
        <h1 className="cell large-12 projTitle" style={{ color: '#433aa5' }}>{projectData.title}</h1>
        <h2 className="cell projTitle" style={{ color: '#9691c3' }}>{projectData.projectType}</h2>
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
            <span> {shortenNumber(projectData.budget)}</span>
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
          </h5>
        </div>
      </div>
    </div>

  );
};

function mapStateToProps(state: any) {
  return {
    project: state.project
  };
}

export default connect(mapStateToProps)(ProjectHeader);
