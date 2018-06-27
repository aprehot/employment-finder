import React from 'react';
import { connect } from 'react-redux';
import { getUpdates } from './actions';
import './styles.scss';
import { IReduxProps } from '../userPost/projectInterface';


const mapStateToProps = ({ user }: IReduxProps) => ({ user })

@(connect(mapStateToProps, null) as any)
export default class UserUpdates extends React.PureComponent<IReduxProps> {
  componentDidMount() {
    this.props.dispatch(getUpdates());
  }

  emphasizeNames = (string: any) => (
    <b id="emphasizeName">{string.split(' ').slice(0, 2).join(' ')}</b>
  )

  ShowUpdates = (updates: IReduxProps['user']['userUpdates']) => (
    <div className="projViewFeedItem grid-x">
      {updates ?
        updates.map((listItem) => (
          <div key={listItem._id} className="cell grid-x projViewFeed" >
            <p className="cell auto">{this.emphasizeNames(listItem.text)}
              <span className='feedTxt'>  {(listItem.text).split(' ').slice(2).join(' ')}</span>
            </p>
            <p className="cell shrink feedTime">{listItem.time}</p>
          </div>
        ))
        : null
      }
    </div>
  )

  render() {
    const { userUpdates }: IReduxProps['user'] = this.props.user;
    return (
      <div className="grid-x projectViewCards large-5">
        <h4 className="cell projectViewUpdateTitle">Updates</h4>
        <div className="cell">
          {this.ShowUpdates(userUpdates)}
        </div>
      </div>
    );
  }
}

