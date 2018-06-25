import *  as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import './style.scss';
import { IReduxProps } from '../../containers/userPost/projectInterface';

const Header: React.SFC = () => {
  // TODO: add login prop and conditional load prof avatar
  const user: string = 'https://s3-us-west-1.amazonaws.com/anidemo/dilan.png';

  return (
    <nav className="grid-x navANi align-middle">
      <div className="profileNav grid-x cell large-3">
        <div className="cell grid-x large-11">
          <img
            src={user}
            alt="ANiLogo"
            id="profileAvatar"
            className="cell shrink ANiLogo"
          />
          <div className="cell large-6 profileNavInfo">
            <h4 className="cell profileAvatar large-12">Dilan Swain</h4>
            <h5 className="cell profileCompany large-12">ANi</h5>
          </div>
          <img
            alt="Notifications"
            className="cell notifications large-3"
            src="https://s3-us-west-1.amazonaws.com/anidemo/bell.jpeg"
          />
        </div>
      </div>
      <div className="grid-x cell large-5">
        <input
          type="text"
          placeholder="Search ANi"
          className="cell large-6 searchANi"
        />
      </div>
      <div className="cell large-4 grid-x">
        <div className="grid-x cell large-11 navANiLinks">
          <Link to="/" className="navANiLink">Home</Link>
          <Link to="/dashboard" className="navANiLink">My Vault</Link>
          <h3 className="navANiLink">ANi</h3>
          <h3 className="navANiLink">Settings</h3>
          <img
            alt="ANi Logo"
            className="ANiLogo"
            src="https://s3-us-west-1.amazonaws.com/anidemo/aniwings%402x.png"
          />
        </div>
      </div>
    </nav>
  );
};

const mapStateToProps = ({ user }: IReduxProps) => ({ user })

export default connect(mapStateToProps)(Header);
