import * as React from 'react';
import { connect } from 'react-redux';

import { IProps } from '../Login/LoginForm';
import { getFolders } from '../UserFolders/actions'
import { ProjectDates, ProjectMains, ProjectType, ProjectRoles, ProjectTeams } from './projectPostExport'

interface IState {
    postPage: number
}

const mapStateToProps = ({ user, router, project }: IProps) => ({ user, router, project })

@(connect(mapStateToProps, null) as any)
export default class PostingContainer extends React.Component<any, IState> {
    state: IState = {
        postPage: 0
    }

    async componentDidMount() {
        if (!this.props.user.userFolders) {
            const req = await this.props.dispatch(getFolders())
            return req
        }
    }

    render() {
        const { postPage } = this.state
        return (
            <div className="grid-container">

                {postPage === 0 && <ProjectType />}
                {postPage === 1 && <ProjectMains />}
                {postPage === 2 && <ProjectDates />}
                {postPage === 3 && <ProjectRoles />}
                {postPage === 4 && <ProjectTeams />}
                <button className="success button">Submit Project</button>
            </div>
        );
    }
}
