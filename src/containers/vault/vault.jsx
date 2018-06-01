import React, { Component } from 'react';
// import {Link} from 'react-router-dom';
import VaultColumn from '../../components/vaultColumn/vaultColumn';
import MyProjects from '../../components/myProjects/myProjects';

class MyVault extends Component {
  render() {
    return (
      <main className="grid-x myVault" >

        <div className="cell grid-x large-4">
            <div className="cell large-9 vaultColumn">
              <VaultColumn />
            </div>
        </div>


        <div id="myProjects" className="grid-y large-4 cell align-center">
          <div className="grid-y large-10">
            <MyProjects />
          </div>
        </div>



        <div id="myUpdates" className="grid-y large-4 cell align-center">
          <div className="grid-x large-10">

          </div>
        </div>
      </main>
      )
    }
  }

export default MyVault;
