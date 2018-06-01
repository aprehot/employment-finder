import React from 'react';

const vaultColumn = ({}) => (
  <div className="grid-y grid-frame">

      <div className="cell large-6">
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

      <div className="cell large-6">
        <div className="grid-y grid-frame ">
          <div className="cell large-7">
            <div className="grid-x align-middle align-center">
              <div className="grid-x cell large-11 quickShare grid-padding-y">
                <h3 className="cell quickShareHeader">Quick Share</h3>
                <input placeholder="Enter Project" className="cell quickShareInput" type="text"  />
                <input placeholder="Enter Name or Email" className="cell quickShareInput" type="text"  />
                  <div className="quickShareOption">
                    <div className="cloudBtns" style={{opacity: '0.4'}}>
                      <img className="cloudImgs" src="https://s3-us-west-1.amazonaws.com/anidemo/anicloud%402x.png" />
                      <p style={{color:'#8484FF'}}>Open</p>
                    </div>
                    <div className="cloudBtns" style={{opacity: '0.4'}}>
                      <img className="cloudImgs" src="https://s3-us-west-1.amazonaws.com/anidemo/anicloud%402x.png" />
                      <p style={{color:'#8484FF'}}>1st</p>
                    </div>
                    <div className="cloudBtns" style={{opacity: '0.4'}}>
                      <img className="cloudImgs" src="https://s3-us-west-1.amazonaws.com/anidemo/anicloud%402x.png" />
                      <p style={{color:'#8484FF'}}>2nd</p>
                    </div>
                  </div>
                <div className="cell grid-x quickShareBtns">
                  <a className="button primary large-5 cell quickShareBtn">Add Note</a>
                  <a className="button primary large-5 cell quickShareBtn">Share</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
);

export default vaultColumn;
