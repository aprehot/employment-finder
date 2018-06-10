import React from 'react';
import { connect } from 'react-redux';

import './styles.scss';


class UserUpdates extends React.Component {
  state = {
    userUpdates: null
  }

  componentDidUpdate(prevprops, prevState, snapshot) {
    if (snapshot !== null && this.state.userUpdates === null) {
      this.setState({ userUpdates: snapshot });
    }
  }
  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (Object.keys(prevProps.user).length === 2 && this.state.userUpdates === null) {
      const updates = this.props.user.userUpdates.userUpdates.staticFeed;
      return updates;
    }
    return null;
  }


  ShowUpdates = (updates) => (
    <div className="cell large-2">
      {updates !== null ?
        updates.map((listItem) => (
          <div key={listItem._id} className="grid-x  large-3">
            {console.log(listItem)}
            <img src={listItem.image} alt={'ANi User Update Feed'} />
          </div>
        ))
        : null
      }
    </div>
  )

  render() {
    const { userUpdates } = this.state
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
          <div className="grid-y grid-frame">
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
