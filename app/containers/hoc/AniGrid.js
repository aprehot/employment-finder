import React from 'react';
import './style.scss';

const AniGrid = ({ Left, Middle, Right }) => (
  <article className="grid-x myVault">
    <div className="cell grid-x large-4 ">
      <div className="cell large-9 vaultColumn">
        {Left ? <Left {...Left} /> : null}
      </div>
    </div>

    <div className="grid-y large-4 cell align-center">
      {Middle ? <Middle {...Middle} /> : null }
    </div>

    <div className="grid-y large-4 cell align-center">
      {Right ? <Right {...Right} /> : null}
    </div>
  </article>
);

export default AniGrid;
