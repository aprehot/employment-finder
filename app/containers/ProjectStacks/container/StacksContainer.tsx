import * as React from 'react';
import { connect } from 'react-redux';

import '../style.scss';
import ProjectStack from '../component/projectStack'
import { getFolders } from '../actions';
import { IReduxProps, } from '../../userPost/projectInterface';
import AddStackModal from './addStackModal/addStackModal';

// outer most component in /dashboard; the component it contains is projectStack
const mapStateToProps = ({ project, user }: IReduxProps) => ({ project, user })

@(connect(mapStateToProps, null) as any)
export default class ProjectStacks extends React.Component<IReduxProps, any> {

  async componentDidMount() {
    if (this.props.user.userFolders !== []) {
      const req = await this.props.dispatch(getFolders())
      return req
    }
  }

  render() {
    return (
      <article className="ANiStacks ">

        <div className="cell projectViewNav">
          <button className="projectViewBtn shrink projectFilterBtn button tertiary" ></button>
          <input type='text' className='projectViewSearch' placeholder="Search" />
          <AddStackModal />
        </div>
        <ProjectStack {...this.props} />
      </article>

    )
  }
}

