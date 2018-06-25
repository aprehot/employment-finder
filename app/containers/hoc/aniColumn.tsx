import React from 'react';

interface IProps {
  Top: any
  Bottom: any
}

const AniColumn: React.SFC<IProps> = ({ Top, Bottom }) => (
  <div className="grid-y grid-frame">
    <div className="cell large-5">
      <div className="grid-y grid-frame align-center">
        {Top ? <Top /> : null}
      </div>
    </div>
    {Bottom ? <Bottom /> : null}
  </div>
);

export default AniColumn
