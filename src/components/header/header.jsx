import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';


const Navigation = (username, companyName, profileName) => {
  let user = "https://s3-us-west-1.amazonaws.com/anidemo/dilan.png"

  return (
    <nav className="grid-x navANi align-center align-middle">
      <div className="profileNav grid-x cell large-3">
        <img className="cell shrink ANiLogo" src={user} alt="ANiLogo" />
        <div className="cell grid-x large-6 align-middle">
          <h4 className="cell profileAvatar">Dilan Swain</h4>
          <h5 className="cell profileCompany">ANi</h5>
        </div>
      </div>
      <div className="grid-x cell large-4">
        <input type="text" placeholder="Search ANi" className="cell large-8 shrink searchANi" />
      </div>
      <div className="cell large-5 grid-x align-right">
        <div className="grid-x cell large-11 navANiLinks">
          <h4 className="navANiLink">Home</h4>
          <h4 className="navANiLink">My Vault</h4>
          <h4 className="navANiLink">ANi</h4>
          <h4 className="navANiLink">Settings</h4>
          <img className="ANiLogo" src="https://s3-us-west-1.amazonaws.com/anidemo/aniwings%402x.png" />
        </div>
      </div>
    </nav>
  )
}


export default Navigation
