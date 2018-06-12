import * as React from 'react';
import { connect } from 'react-redux';

interface IState {
  userUpdates: any
}

class ProjectTeam extends React.PureComponent<IState> {
  state: IState = {
    userUpdates: [
      {
        image: '/uploads/2018-06-10T15-31-49.294Za09263b57e71774dc63f84d800c1442f.png',
        name: 'Sam Shelley',
        role: 'Director'
      },
      {
        image: '/uploads/2018-06-10T15-30-16.717Z95c58e9fc94f4c43786729543a2ecb27.png',
        name: 'Matt Wilson',
        role: 'Producer'
      },
      {
        image: '/uploads/2018-06-10T15-20-04.726Z6b445ad8dc737a683c558337975ab1cd.png',
        name: 'Raylin Sabo',
        role: 'Casting Director'
      },
      {
        image: '/uploads/2018-06-10T15-31-25.968Zccf2c719af04c6e34bf5f239c25fca67.png',
        name: 'May Verniue',
        role: 'Casting Director'
      }
    ]
  }
  render() {
    const { userUpdates } = this.state;
    return (
      <div className="grid-x large-10 align-right" >
        <div className=" grid-y large-10 updateContainer" >
          <div className="myUpdatesHeader cell">
            <img
              alt="Project Folders"
              src="https://s3-us-west-1.amazonaws.com/anidemo/anicloud%402x.png"
            />
            <h2>Team</h2>
          </div>
          <div className="grid-y grid-frame cell">
            <div className="cell large-3" style={{ margin: '15px 0 0 0' }}>
              {userUpdates ?
                userUpdates.map((listItem:any, i:number) => (
                  <div key={i} className="grid-x grid-padding-x">
                    <img
                      className="cell large-3 feedImg"
                      src={listItem.image}
                      alt={'ANi User Update Feed'}
                    />
                    <div className="cell large-9 teamIdentity">
                      <h3 style={{ margin: '0' }} className="cell">{listItem.name}</h3>
                      <p style={{ margin: '0' }} className="cell">{listItem.role}</p>
                    </div>
                    <hr></hr>
                  </div>
                ))
                : null
              }
            </div>
          </div>
        </div>
      </div>
    );
  }
}

function mapStateToProps(state: any) {
  return {
    user: state.user
  };
}

export default connect(mapStateToProps)(ProjectTeam);
