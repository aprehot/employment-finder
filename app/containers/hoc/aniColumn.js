import React from 'react';


const AniColumn = ({ Top, Bottom }) => (
  <div className="grid-y grid-frame">
    <div className="cell large-5">
      <div className="grid-y grid-frame align-center">
        {Top ? <Top /> : null}
      </div>
    </div>
    {Bottom ? <Bottom /> : null}
  </div>
);

export default AniColumn;
