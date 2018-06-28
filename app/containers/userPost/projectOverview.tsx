import React from 'react';
import { connect } from 'react-redux';

import { IOverviewProps } from './projectInterface';
import { postProps } from './projectInterface';
import { postProject } from '../../utils/post';

const ProjectOverview: React.SFC<IOverviewProps> = (props) => {
    const { projectData } = props
    const { studio, parentFolder, parentCategory, title, hasCD } = projectData[1]
    const { budget, genres, location, premise, startDate, wrapDate } = projectData[2]
    const { roles } = projectData[3]
    const { teams } = projectData[4]
    const project = {
        ownerId: props.user.payload.id,
        parentFolder: parentFolder,
        parentCategory: parentCategory,
        projectType: props.projectData[0].projectType,
        title: title,
        studio: studio,
        startDate: startDate,
        wrapDate: wrapDate,
        location: location,
        budget: budget,
        genres: genres,
        premise: premise,
        hasCD: hasCD,
        roles: roles,
        teams: teams
    }
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
                    <h4><b>Team member: {member.name}</b></h4>
                    <h5>Team member's Email:</h5><h6>{member.email}</h6>
                    <h5>Team Member's Job:</h5><h6>{member.job}</h6>
                    <h5>Priviledges:</h5>
                    <p className="help-text">
                        Member has the priviledges of a <b>{member.priviledge}</b>
                    </p>
                    <hr></hr>
                </React.Fragment>
            ))}
            <button
                onClick={() => postProject(project)}
                className="success button">Submit Project</button>
        </div>
    );
};

const mapStateToProps = ({ user }: postProps) => {
    return { user }
}

export default connect(mapStateToProps)(ProjectOverview);