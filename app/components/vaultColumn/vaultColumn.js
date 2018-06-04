import React from 'react';
import QuickShare from '../quickShare/quickShare';


const vaultColumn = ({}) => (
  <div className="grid-y grid-frame">
    <div className="cell large-5">
      <div className="grid-y grid-frame align-center">
        <div className="cell large-7">
          <div className="grid-x align-middle align-center" style={{height:'100%'}}>
            <div className="grid-x large-9" style={{height:'100%'}}>
              <h1 style={{maxHeight:'6vh'}} className="myVault">My Vault</h1>
              <input placeholder="Search Vault" className="vaultSearch" type="text"  />
              <a style={{alignSelf: 'center'}} className="button primary shrink">
                Show Filters
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
    <QuickShare />
  </div>
);

export default vaultColumn;
