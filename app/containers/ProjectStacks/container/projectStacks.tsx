import * as React from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from '../../../components/LoadingIndicator';
import { Link } from 'react-router-dom';

import '../style.scss';
import ProjectStack from '../component/projectStack'
import { getFolders, getContents } from '../actions';
import { getProjectId } from '../../ProjectContainer/actions';
import { IReduxProps, actualProjectModel, postProps, OtherProps } from '../../userPost/projectInterface';
import ProjectTeams from '../../userPost/projectTeams';

/* eslint no-underscore-dangle: 0 */
/* eslint no-nested-ternary: 0 */


const mapStateToProps = ({ project, user }: IReduxProps) => ({ project, user })

@(connect(mapStateToProps, null) as any)
export default class ProjectStacks extends React.Component<IReduxProps, any> {

  async componentDidMount() {
    if (this.props.user.userFolders !== []) {
      const req = await this.props.dispatch(getFolders())
    }
  }

  render() {
    return (
      <article className="ANiStacks ">
        <div className="cell projectViewNav">
          <button className="projectViewBtn shrink projectFilterBtn button tertiary" ></button>
          <input type='text' className='projectViewSearch' placeholder="Search" />
        </div>
        <ProjectStack {...this.props} />
      </article>

    )
  }
}