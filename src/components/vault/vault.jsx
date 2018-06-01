import React, { Component } from 'react';
// import {Link} from 'react-router-dom'
import Navigation from '../header/header';


class MyVault extends Component {
  render() {
    return (
      <main className="grid-x" style={{height: '95vh'}}>
        <div className="cell large-4">
          <div className="grid-y grid-frame align-top">
            <div className="cell large-6">
              <div className="grid-y grid-frame align-center">
                <div className="cell large-5">
                  <div className="grid-x align-middle align-center" style={{height: '100%'}}>
                    <div className="grid-x cell large-10" style={{height: '100%'}}>
                      <h1 className="cell">My Vault</h1>
                      <input className="cell" type="text"  />
                      <a style={{alignSelf: 'center'}} className="button primary shrink cell">
                        Show Filters
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="cell large-6 align-center">
              <div style={{width: '100%'}} className="grid-x cell large-6 align-center">
                <div className="grid-x cell large-10 quickShare" >
                  <h2>Quick Share</h2>
                  <input type="text" className="" />
                  <input type="text" className="" />
                  <a className="button">Share</a>
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
