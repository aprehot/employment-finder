import * as React from 'react';
import { connect } from 'react-redux';
import LoadingIndicator from '../../components/LoadingIndicator';
import { Link } from 'react-router-dom';

import { getFolders, getContents } from './actions';
import { getProjectId } from '../ProjectContainer/actions';
import './style.scss';

/* eslint no-underscore-dangle: 0 */
/* eslint no-nested-ternary: 0 */

interface IState {
  projectType: boolean;
  activeFolder: string;
}

interface IProps {
  dispatch: any;
  user: {
    userFolders: IUserFolders[];
    folderContents: IFolderContents;
  },
  project: {
    projectData: any;
  }
}
interface IUserFolders {
  ownerId: string;
  category: string;
  folderName: string;
  _id: string;
}
interface IFolderContents {
  projects: IProject[]
}
interface IProject {
  _id: string;
  title: string;
}


// OPTIMIZE: Pure Component ?
class UserFolders extends React.Component<IProps, IState> {
  state = {
    projectType: true,
    activeFolder: ''
  }
  componentDidMount() {
    this.props.dispatch(getFolders());
  }

  showContents = (
    folder: IUserFolders,
    folderContents: IFolderContents
  ) => (
      folderContents && this.state.activeFolder === folder.folderName ?
        folderContents.projects[0] ?
          <div className="contentContainer">
            {folderContents.projects.map((project) => (
              <Link
                key={project._id}
                to={`/project/${project._id}`}
                onClick={() => this.props.dispatch(getProjectId(project._id))}
              >
                <h5 className="folderProjects">
                  {project.title}
                </h5>
              </Link>
            ))}
          </div>
          :
          <p style={{ color: 'rgb(132, 132, 255)' }}>This folder has no contents.</p>
        :
        null
    )

  showPersonal = (
    personal: IUserFolders,
    folderContents: IFolderContents
  ) => (
      !this.state.projectType && personal.category === 'Personal' ?
        <div
          tabIndex={0}
          role="button"
          key={personal._id}
          className="grid-x cell folder"
          onClick={(e) => {
            const { innerText }: any = e.target
            this.props.dispatch(getContents(innerText, 'Personal'));
            this.setState({ activeFolder: innerText });
          }}
        >
          <img
            alt={personal.folderName}
            className="folderImg cell large-3"
            src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png"
          />
          <h4 className="cell large-9 folderNames">
            <span>{personal.folderName}</span>
          </h4>
          {this.showContents(personal, folderContents)}
        </div>
        : null
    )


  showUserFolders = (
    folders: IProps["user"]["userFolders"],
    folderContents: IFolderContents
  ) => (
      folders ?
        folders.map((folder) => (
          this.state.projectType && folder.category === 'Company' ?
            <div
              tabIndex={0}
              role="button"
              key={folder._id}
              className="grid-x cell folder"
              onClick={(e) => {
                const { innerText }: any = e.target
                this.props.dispatch(getContents(innerText, 'Company'));
                this.setState({ activeFolder: innerText });
              }}
            >
              <img
                alt={folder.folderName}
                className="folderImg cell large-3"
                src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png"
              />
              <h4 className="cell large-9 folderNames">
                <span>{folder.folderName}</span>
              </h4>
              {this.showContents(folder, folderContents)}
            </div>
            :
            this.showPersonal(folder, folderContents)
        ))
        : <LoadingIndicator />
    )

  render() {
    const { userFolders, folderContents } = this.props.user;
    const { projectType } = this.state;
    return (
      <div className="grid-y large-10 folderContainer">
        <div className="grid-x" >
          <div className="myProjectsHeader cell">
            <img alt="Project Folders" src="https://s3-us-west-1.amazonaws.com/anidemo/anifolder%402x.png" />
            <h2>Projects</h2>
          </div>
          <div className="grid-x projectTypes cell" >
            <div
              role="button"
              tabIndex={0}
              className="cell large-6 projectType text-center"
              onClick={() => this.setState({ projectType: true })}
              style={{
                background: projectType ? '#8484FF' : '#C9C9FF',
                borderRadius: projectType ? '20px 0 0 0' : '0 0 0 20px',
              }}
            >
              <h5>
                Company
              </h5>
            </div>
            <div
              role="button"
              tabIndex={0}
              className="cell large-6 projectType text-center"
              onClick={() => this.setState({ projectType: false })}
              style={{
                background: projectType ? '#C9C9FF' : '#8484FF',
                borderRadius: projectType ? '0 0 20px 0' : '0 20px 0 0'
              }}
            >
              <h5>
                Personal
              </h5>
            </div>
          </div>
        </div>
        <div className="grid-x folderDir">
          {this.showUserFolders(userFolders, folderContents)}
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ user, project }: IProps) => ({ user, project })

export default connect(mapStateToProps)(UserFolders);
