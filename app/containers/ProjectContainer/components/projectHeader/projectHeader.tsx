import * as React from 'react';
import { connect } from 'react-redux';
import './styles.scss';
import { postProps } from '../../../userPost/projectInterface';

const shortenNumber = (num: number, decimalPlaces = 0) => {
  var str,
    suffix = '';

  decimalPlaces = decimalPlaces;
  num = +num;

  let factor = Math.pow(10, decimalPlaces);
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

const emphasizeDates = (string: any) => (
  string.split('/').slice(0, 2).join('/')
)


const ProjectHeader: React.SFC<postProps> = ({ project }) => {
  const { projectData } = project;
  return (
    projectData &&
    <div className="cell large-5 medium-12 projectViewCards grid-x grid-padding-x">
      <h1 className="projectCardTitle" >{projectData.title}</h1>
      <p className='projViewPremise'>{projectData.premise}</p>
      <span className="cell large-3 projectDetails">
        <img
          className="unic"
          alt="quick share"
          src="https://s3-us-west-1.amazonaws.com/anidemo/anicloud%402x.png"
        />
        {projectData.security}
      </span>
      <span className="projectDetails cell large-3">
        <span className="unicode">
          &#127902;
          </span>
        {projectData.projectType}
      </span>
      <span role="img" className="projectDetails cell large-3" aria-label="start and end date" >
        <span className="unicode">&#128197;{`\x20`}</span>
        {`${emphasizeDates(projectData.startDate)} to 
        ${emphasizeDates(projectData.wrapDate)}`}</span>

      <span className='projectDetails cell large-3'>
        <span className="unicode" role="img" aria-label="budget">&#128176;</span>
        {shortenNumber(projectData.budget)}
      </span>
      <span className="projectDetails ">
        <span className="unicode" role="img" aria-label="location">
          📌
          </span>
        {`${projectData.location}, USA`}
      </span>
    </div>

  );
};

const mapStateToProps = ({ project }: postProps) => ({ project })

export default connect(mapStateToProps)(ProjectHeader);
