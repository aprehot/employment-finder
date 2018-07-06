import *  as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';


import './style.scss';
import { IReduxProps } from '../../containers/userPost/projectInterface';

const SideNav: React.SFC = () => {
  // TODO: add login prop and conditional load prof avatar
  const user: string = 'https://s3-us-west-1.amazonaws.com/anidemo/dilan.png';


  return (
    <header className="headerANi" >
      <nav className="navANi">
        <img
          src={user}
          alt="ANiLogo"
          id="userAvatar"
        />
        <Link to='/' className="headLink homeico" />
        <Link to='/dashboard' className="headLink vaultico" />
        <Link to='/' className="headLink gearico" />
        <Link to='/add' className="headLink searchico" />
      </nav>
    </header>
  );
};

const mapStateToProps = ({ user }: IReduxProps) => ({ user })

export default connect(mapStateToProps)(SideNav);
