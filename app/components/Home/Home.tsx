import * as React from 'react';
import './styles.scss';


const Home: React.SFC = () => (
  <div style={{ height: '92vh', display: 'flex' }}>
    <div className="container">
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
      <div className="ball"></div>
    </div>
    <img
      src="https://s3-us-west-1.amazonaws.com/anidemo/ANi+Logo+Full.png"
      className="homeLogo"
      alt="ANiLogo"
    />

  </div>
);

export default Home;
