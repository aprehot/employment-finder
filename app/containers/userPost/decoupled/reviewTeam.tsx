import React from 'react';

const ReviewTeam = ({ team, arrayHelpers, index }: any) => {
    return (
        <li className="roleCard callout large-3 cell " key={`${team}${index}`}>
            <button className="close-button alert" onClick={() => arrayHelpers.remove(index)}>
                <span aria-hidden="true" style={{ color: 'white' }}>&times;</span>
            </button>
            <h5>Job Type: {team.job}</h5>
            <h4>Member Name: {team.name}</h4>
            <h5>Email: {team.email}</h5>
            <div className="secondary button-group fieldset">
                <legend className="cell">Priviledges</legend>
                {/* {['Admin', 'Collaborator'
                ].map((bool: string, indx: number) => (
                    <React.Fragment key={`${bool}${indx}`}>
                        <span> {bool}?: {team[bool] ? 'yes' : 'no'} </span>
                        <span
                            key={`${bool}${indx}`}
                            className={`${team[bool] ? 'successBox' : 'alertBox'} button`}
                        >
                            <p className="boolLabel help-text" >
                                {bool === 'Admin' ? 'Access to the private page' : 'Access to edit shared page'}
                            </p>
                        </span>
                    </React.Fragment>
                )
                )} */}
            </div>
        </li>
    );
};

export default ReviewTeam;