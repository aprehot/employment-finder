import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


const Navigation = (username, companyName, profileName) => {
  let user = "https://s3-us-west-1.amazonaws.com/anidemo/dilan.png"

  return (
    <nav className="grid-x navANi align-middle">
      <div className="profileNav grid-x cell large-3">
        <div className="cell grid-x large-10">
          <img id="profileAvatar" className="cell shrink ANiLogo" src={user} alt="ANiLogo" />
          <div className="cell grid-x large-9 align-middle">
            <h4 className="cell profileAvatar">Dilan Swain</h4>
            <h5 className="cell profileCompany">ANi</h5>
          </div>
        </div>
        <img className="cell notifications" src="https://s3-us-west-1.amazonaws.com/anidemo/bell.jpeg" alt="Notifications" />
      </div>
      <div className="grid-x cell large-5">
        <input type="text" placeholder="Search ANi" className="cell large-6 searchANi" />
      </div>
      <div className="cell large-4 grid-x">
        <div className="grid-x cell large-11 navANiLinks">
          <h3 className="navANiLink">Home</h3>
          <h3 className="navANiLink">My Vault</h3>
          <h3 className="navANiLink">ANi</h3>
          <h3 className="navANiLink">Settings</h3>
          <img alt="ANi Logo" className="ANiLogo" src="https://s3-us-west-1.amazonaws.com/anidemo/aniwings%402x.png" />
        </div>
      </div>
    </nav>
  )
}


export default Navigation
