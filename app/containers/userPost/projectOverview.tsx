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
            <h1><b>Project Title:</b> {title}</h1>
            <h2><b>By</b> {studio}</h2>
            <h2><b>Project Type:</b> {projectData[0].projectType}</h2>
            <p className="help-text">In the folder <b>{parentFolder}</b> of the <b>{parentCategory}</b> Category</p>
            <hr></hr>
            <h5>Budget:</h5><h6>{budget}</h6>
            <h5>Genres</h5><h6>{genres}</h6>
            <h5>location:</h5><h6>{location}</h6>
            <h5>Premise:</h5><h6>{premise}</h6>
            {/* <div style={{ border: 'solid 1px black', margin: '15px', padding: '15px' }}>
                <h3>Start Date:</h3><h4>{startDate}</h4>
                <h3>Wrap Date:</h3><h4>{wrapDate}</h4>
            </div> */}
            <p className="help-text">Start Date: <b>{startDate}</b> Wrap Date: <b>{wrapDate}</b> </p>
            <hr></hr>
            {roles.map((role, i) => (
                <div key={`${role.name}${i}`}>
                    <h4><b>Actor: {role.name}</b></h4>
                    <h5>Minimum and Maximum Age</h5><h6>{`${role.ages[0]} and ${role.ages[1]}`}</h6>
                    <h5>Role Type:</h5><h6>{role.roleType}</h6>
                    <h5>Specifics:</h5><h6>{role.specifics}</h6>
                    <h5>Description:</h5><h6>{role.description}</h6>
                    <p className="help-text">
                        is Local?: <b>{role.isLocal ? 'yes' : 'no'}</b><br></br>
                        is on Offer?: <b>{role.isOnOffer ? 'yes' : 'no'}</b><br></br>
                        is Open: <b>{role.isOpen ? 'yes' : 'no'} </b><br></br>
                        is Sag: <b>{role.isSag ? 'yes' : 'no'}</b><br></br>
                    </p>
                    <hr></hr>
                </div>
            ))}
            {teams.map((member, ind) => (
                <React.Fragment key={`${member.name}${ind}`}>
                    <h4>Team member: {member.name}</h4>
                    <h5>Team member's Email:</h5><h6>{member.email}</h6>
                    <h5>Team Member's Job:</h5><h6>{member.job}</h6>
                    <h5>Priviledges:</h5>
                    <p className="help-text">
                        Admin?: <b>{member.Admin ? 'yes' : 'no'}</b><br></br>
                        Collaborator?: <b>{member.Collaborator ? 'yes' : 'no'}</b>
                    </p>
                    <hr></hr>
                </React.Fragment>
            ))}
            <button type="submit" className="success button">Submit Project</button>
        </div>
    );
};

export default ProjectOverview;