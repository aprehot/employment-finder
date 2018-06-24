import React from 'react';

import { IOverviewProps } from './projectInterface';

const ProjectOverview: React.SFC<IOverviewProps> = (props) => {
    const { projectData, postProject } = props
    const { studio, parentFolder, parentCategory, title } = projectData[1]
    const { budget, genres, location, premise, startDate, wrapDate } = projectData[2]
    const { roles } = projectData[3]
    const { teams } = projectData[4]
    roles.map(role => console.log(role))
    return (
        <div>
            <h1>Project Title: {title}</h1>
            <h2>By {studio}</h2>
            <h2>Project Type: {projectData[0].projectType}</h2>
            <p className="help-text">In the folder <b>{parentFolder}</b> of the <b>{parentCategory}</b> Category</p>
            <hr></hr>
            <h5>Budget:</h5><h6>{budget}</h6>
            <h5>Genres</h5><h6>{genres}</h6>
            <h5>location:</h5><h6>{location}</h6>
            <h5>Premise:</h5><h6>{premise}</h6>
            <div style={{ border: 'solid 1px black', margin: '15px', padding: '15px' }}>
                <h3>Start Date:</h3><h4>{startDate}</h4>
                <h3>Wrap Date:</h3><h4>{wrapDate}</h4>
            </div>
            <p className="help-text">Start Date: <b>{startDate}</b> Wrap Date: <b>{wrapDate}</b> </p>
            <hr></hr>
            {roles.map((role, i) => (
                <React.Fragment key={`${role.name}${i}`}>
                    <h4>ages:</h4><h5>{role.ages}</h5>
                    <h4>name</h4><h5>{role.name}</h5>
                    <h4>roleType:</h4><h5>{role.roleType}</h5>
                    <h4>specifics:</h4><h6>{role.specifics}</h6>
                    <h4>description:</h4><h6>{role.description}</h6>
                    <p className="help-text">
                        is Local?: <b>{role.isLocal ? 'yes' : 'no'}</b>
                        is on Offer?: <b>{role.isOnOffer ? 'yes' : 'no'}</b>
                        is Open: <b>{role.isOpen ? 'yes' : 'no'} </b>
                        is Sag: <b>{role.isSag ? 'yes' : 'no'}</b>
                    </p>
                </React.Fragment>
            ))}
            <hr></hr>
            {teams.map((member, ind) => (
                <React.Fragment key={`${member.name}${ind}`}>
                    <h5>Team member's Name:</h5><h6>{member.name}</h6>
                    <h5>Team member's Email:</h5><h6>{member.email}</h6>
                    <h5>Team Member's Job:</h5><h6>{member.job}</h6>
                    <h5>Priviledges:</h5>
                    <p className="help-text">
                        Admin?: <b>{member.Admin ? 'yes' : 'no'}</b>
                        Collaborator?: <b>{member.Collaborator ? 'yes' : 'no'}</b>
                    </p>
                </React.Fragment>
            ))}
            <button type="submit" className="success button">Submit</button>
        </div>
    );
};

export default ProjectOverview;