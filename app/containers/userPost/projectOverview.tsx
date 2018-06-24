import React from 'react';

import { IOverviewProps } from './projectInterface';

const ProjectOverview: React.SFC<IOverviewProps> = (props) => {
    const { projectData, postProject } = props
    const { studio, parentFolder, parentCategory, title } = projectData[1]
    const { budget, genres, location, premise, startDate, wrapDate } = projectData[2]
    const { ages, description, isLocal, isOnOffer, isOpen, isSag, name, roleType, specifics } = projectData[3].roles[0]
    const { Admin, Collaborator, email, job } = projectData[4].teams[0]
    return (
        <div>
            <h1>Project Title: {title}</h1>
            <h2>By {studio}</h2>
            <h2>Project Type: {projectData[0].projectType}</h2>
            <p className="help-text">In the folder <b>{parentFolder}</b> of the <b>{parentCategory}</b> Category</p>
            <hr></hr>
            <button type="submit" className="success button">Submit</button>
        </div>
    );
};

export default ProjectOverview;