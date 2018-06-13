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
      alt="ANiLogo"
      className="homeLogo"
      src="https://s3-us-west-1.amazonaws.com/anidemo/ANi+Logo+Full.png"
    />

  </div>
);

export default Home;
