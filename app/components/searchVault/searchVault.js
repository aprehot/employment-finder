import React from 'react';

const SearchVault = ({}) => (
  <div className="cell large-7">
    <div className="grid-x align-middle align-center" style={{ height: '100%' }}>
      <div className="grid-x large-9" style={{ height: '100%' }}>
        <h1 style={{ maxHeight: '6vh' }} className="myVault">My Vault</h1>
        <input placeholder="Search Vault" className="vaultSearch" type="text" />
        <a style={{ alignSelf: 'center' }} className="button primary shrink">
          Show Filters
        </a>
      </div>
    </div>
  </div>
);

export default SearchVault;
