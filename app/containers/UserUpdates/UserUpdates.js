import React from 'react';
import { connect } from 'react-redux';
import { getUpdates } from './actions';
import './styles.scss';


class UserUpdates extends React.Component {
  componentDidMount() {
    this.props.dispatch(getUpdates());
  }


  ShowUpdates = (updates) => (
    <div className="cell large-3" style={{ margin: '65px 0 0 0' }}>
      {updates ?
        updates.map((listItem) => (
          <div key={listItem._id} className="feedBox">
            <img
              className="feedImg"
              src={listItem.image}
              alt={'ANi User Update Feed'}
            />
            <p className="feedInfo">{listItem.text}</p>
            <p className="feedTime">{listItem.time}</p>
            <hr></hr>
          </div>
        ))
        : null
      }
    </div>
  )

  render() {
    const { userUpdates } = this.props.user;
    return (
      <div className="grid-x large-10 align-right" >
        <div className=" grid-y large-10 updateContainer" >
          <div className="myUpdatesHeader cell">
            <img
              alt="Project Folders"
              src="https://s3-us-west-1.amazonaws.com/anidemo/anicloud%402x.png"
            />
            <h2>Updates</h2>
          </div>
          <div className="grid-y grid-frame cell">
            {this.ShowUpdates(userUpdates)}
          </div>
        </div>
      </div>
    );
  }
}


function mapStateToProps(state) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(UserUpdates);
