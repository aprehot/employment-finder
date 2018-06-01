import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


const Navigation = (username, companyName, profileName) => {
  return (
    <nav className="grid-x">
      <div className="grid-x cell large-3">
        <img className="cell large-6" src="../../assets/ANiLogo.png" />
        <div className="cell grid-x large-6">
          <h1 className="cell"></h1>
          <h3 className="cell"></h3>
        </div>
      </div>
      <div className="grid-x cell large-3">
        <input className="cell large-8" />
      </div>
      <div className="grid-x cell large-6">
        <a>Home</a>
        <a>My Vault</a>
        <a>ANi</a>
        <a>Settings</a>
        <img id="ANiLogo" src="" />
      </div>
    </nav>
  )
}


export default connect (
  state=>state,
  null,
  null,
  {pure:false}
)(Navigation)
