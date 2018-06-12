import * as React from 'react';
// import '../../containers/HomePage/style.scss';


const styles = {
  opac: {
    opacity: 0.4
  }
}

const QuickShare: React.SFC = () => (
  <div className="cell large-6">
    <div className="grid-y grid-frame" style={{justifyContent: 'center'}}>
      <div className="cell large-10" style={{display: 'flex'}}>
        <div className="grid-x align-middle align-center">
          <div className="grid-x cell large-11 quickShare grid-padding-y">
            <h3 className="cell quickShareHeader">Quick Share</h3>
            <input placeholder="Enter Project" className="cell quickShareInput" type="text" />
            <input placeholder="Enter Name or Email" className="cell quickShareInput" type="text" />
            <div className="quickShareOption">
              <div className="cloudBtns" style= {styles.opac}  >
                <img alt="quick share" className="cloudImgs" src="https://s3-us-west-1.amazonaws.com/anidemo/anicloud%402x.png" />
                <p style={{ color: '#8484FF' }}>Open</p>
              </div>
              <div className="cloudBtns" style= {styles.opac} >
                <img alt="quick share" className="cloudImgs" src="https://s3-us-west-1.amazonaws.com/anidemo/anicloud%402x.png" />
                <p style={{ color: '#8484FF' }}>1st</p>
              </div>
              <div className="cloudBtns" style= {styles.opac} >
                <img alt="quick share" className="cloudImgs" src="https://s3-us-west-1.amazonaws.com/anidemo/anicloud%402x.png" />
                <p style={{ color: '#8484FF' }}>2nd</p>
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
);

export default QuickShare;
