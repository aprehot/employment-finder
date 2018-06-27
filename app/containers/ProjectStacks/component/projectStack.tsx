import React from 'react';

import StackType from '../container/stackType';

export const ProjectStack: React.SFC<any> = ({ user }) => {
    const { userFolders } = user
    return (
        <div className="stackContainer">
            {userFolders &&
                <React.Fragment>
                    {[
                        { category: 'Company', type: 'Team Stacks' },
                        { category: 'Personal', type: 'My Stacks' }
                    ].map((stackCat, i) => (
                        <React.Fragment key={`${stackCat.type}${i}`}>
                            <h4 className='stackHeader'>{stackCat.type}</h4>
                            < div className="projectStacks grid-x">
                                <StackType
                                    stackTypes={userFolders}
                                    category={stackCat.category}
                                />
                            </div>
                        </React.Fragment>
                    ))}

                </React.Fragment>}
        </div>
    );
};

export default ProjectStack;