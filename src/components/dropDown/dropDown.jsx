import React from 'react';
import { withRouter, Link } from 'react-router-dom'

const DropDown = (project) => (
  project.titles.map(proj=>
  <div key={proj.id} className="grid-x cell dropDown">
    <Link
      to={`/project/${proj.id}`}
      className="cell projectTitle"
    >
      {proj.title}
    </Link>
  </div>
  )
);

export default DropDown;
