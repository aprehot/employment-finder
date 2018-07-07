import React, { Fragment } from 'react';

import StackType from '../container/stackType';

// this dummy Component is only concerned with mapping over whether a stack is within the Company or Personal row in /dashboard 

export const ProjectStack: React.SFC<any> = ({ user }) => {
    const { userFolders } = user
    return (
        <div className="stackContainer">
            {userFolders &&
                <Fragment>
                    {[
                        { category: 'Company', type: 'Team Stacks' },
                        { category: 'Personal', type: 'My Stacks' }
                    ].map((stackCat, i) => (
                        <Fragment key={`${stackCat.type}${i}`}>
                            <h4 className='stackHeader'>{stackCat.type}</h4>
                            < div className="projectStacks grid-x">
                                <StackType
                                    stackTypes={userFolders}
                                    category={stackCat.category}
                                />
                            </div>
                        </Fragment>
                    ))}

                </Fragment>}
        </div>
    );
};

export default ProjectStack;
