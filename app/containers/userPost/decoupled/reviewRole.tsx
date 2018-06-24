import React from 'react';

const ReviewRole = ({ role, arrayHelpers, index }: any) => {
    return (
        <li className="roleCard callout large-3 cell " key={`${role.name}${index}`}> {/* TODO: pass both keys in as props and split this into new component */}
            <button className="close-button alert" onClick={() => arrayHelpers.remove(index)}>
                <span aria-hidden="true" style={{ color: 'white' }}>&times;</span>
            </button>
            <h5>Role Type: {role.roleType}</h5>
            <h4>Character Name: {role.name}</h4>
            <h5>Gender: {role.gender}</h5>
            <h6>MinAge: {role.ages[0]}</h6>
            <h6>MaxAge: {role.ages[1]}</h6>
            <div className="secondary button-group fieldset">
                <legend className="cell">Yes/No</legend>
                {['isSag', 'isOpen', 'isLocal', 'isOnOffer'].map((bool: string, indx: number) =>
                    <a
                        key={`${bool}${indx}`}
                        className={`${role[bool] ? 'successCheck' : 'alertCheck'} button`}>
                        {bool} {role[bool] ? 'yes' : 'no'}
                    </a>
                )}
            </div>
            <p>{role.specifics}</p>
            <p>{role.description}</p>
        </li>
    );
};

export default ReviewRole