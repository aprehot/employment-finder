import * as React from 'react';
import { Link } from 'react-router-dom';

const SearchVault: React.SFC = () => (
  <div className="cell large-7">
    <div className="grid-x align-middle align-center" style={{ height: '100%' }}>
      <div className="grid-x large-9" style={{ height: '100%', justifyContent: 'center' }}>
        <h1 style={{ maxHeight: '6vh' }} className="myVault">My Vault</h1>
        <input placeholder="Search Vault" className="vaultSearch" type="text" />
        <div style={{ display: 'flex', justifyContent: 'space-around', width: '100%' }}>
          <a style={{ alignSelf: 'center' }} className="button primary shrink">
            Show Filters
        </a>
          <Link style={{ alignSelf: 'center' }} className="button primary shrink" to="/add">
            Add Project!
        </Link>
        </div>
      </div>
    </div>
  </div>
);

export default SearchVault;
