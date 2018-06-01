import React from 'react';


const DropDown = (project) => (
  <div className="grid-x cell ">
    {project.titles.map(project=>
      <h3 className="cell projectTitle" key={project.id}>
        {project.title}
      </h3>)}
  </div>
);

export default DropDown;
