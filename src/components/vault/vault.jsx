import React, { Component } from 'react';
// import {Link} from 'react-router-dom'
import Navigation from '../header/header';


class MyVault extends Component {
  render() {
    return (
      <main className="grid-x" style={{height: '95vh'}}>

        <div className="cell large-4 vaultColumn">
          <div className="grid-y grid-frame">

            <div className="cell large-6">
              <div className="grid-y grid-frame align-center">
                <div className="cell large-5">
                  <div className="grid-x align-middle align-center" style={{height: '100%'}}>
                    <div className="grid-x cell large-10" style={{height: '100%'}}>
                      <h1 className="cell myVault">My Vault</h1>
                      <input className="cell vaultSearch" type="text"  />
                      <a style={{alignSelf: 'center'}} className="button primary shrink cell">
                        Show Filters
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="cell large-6">
              <div className="grid-y grid-frame align-center">
                <div className="cell large-7">
                  <div className="grid-x align-middle align-center" style={{height: '100%'}}>
                    <div className="grid-x cell large-10 align-center quickShare" style={{height: '100%'}}>
                      <h3 className="cell quickShareHeader">Quick Share</h3>
                      <input className="cell" type="text"  />
                      <input className="cell" type="text"  />
                      <a style={{alignSelf: 'center'}} className="button primary shrink cell quickShareBtn">
                        Share
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>


        <div id="myProjects" className="grid-y large-4 cell align-center">
          <div className="grid-y large-10">

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
