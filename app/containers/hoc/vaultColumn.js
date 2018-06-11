import React from 'react';


const vaultColumn = ({Top, Bottom}) => (
  <div className="grid-y grid-frame">
    <div className="cell large-5">
      <div className="grid-y grid-frame align-center">
        {Top ? <Top {...Top} /> : null}
      </div>
    </div>
    {Bottom ? <Bottom {...Bottom} /> : null}
  </div>
);

export default vaultColumn;
