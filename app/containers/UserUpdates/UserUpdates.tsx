import React from 'react';
import { connect } from 'react-redux';
import { getUpdates } from './actions';
import './styles.scss';
import { IReduxProps } from '../userPost/projectInterface';


const mapStateToProps = ({ user }: IReduxProps) => ({ user })

@(connect(mapStateToProps, null) as any)
export default class UserUpdates extends React.Component<IReduxProps> {
  componentDidMount() {
    this.props.dispatch(getUpdates());
  }


  ShowUpdates = (updates: IReduxProps['user']['userUpdates']) => (
    <div className="cell large-3" style={{ margin: '15px 0 0 0' }}>
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
    const { userUpdates }: IReduxProps['user'] = this.props.user;
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

