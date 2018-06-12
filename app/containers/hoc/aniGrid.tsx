import React from 'react';
import './style.scss';

interface IProps {
  Left: any,
  Middle: any,
  Right: any  
}
 
const AniGrid:React.SFC<IProps> = ({ Left, Middle, Right }) => (
  <article className="grid-x myVault">
    <div className="cell grid-x large-4 ">
      <div className="cell large-9 vaultColumn">
        {Left ? <Left /> : null}
      </div>
    </div>

    <div className="grid-y large-4 cell align-center">
      {Middle ? <Middle /> : null }
    </div>

    <div className="grid-y large-4 cell align-center">
      {Right ? <Right /> : null}
    </div>
  </article>
);

export default AniGrid;
