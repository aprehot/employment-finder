import * as React from 'react';
import { connect } from 'react-redux';

import { IProps } from '../Login/LoginForm';
import { getFolders } from '../UserFolders/actions'
import { OtherProps, IValues, postProps } from './projectInterface'
import { ProjectDates, ProjectMains, ProjectType, ProjectRoles } from './projectPostExport'

interface IState {
    postPage: string | undefined
}

const mapStateToProps = ({ user, router, project }: IProps) => ({ user, router, project })

@(connect(mapStateToProps, null) as any)
export default class PostingContainer extends React.Component<any, IState> {
    state: IState = {
        postPage: undefined
    }

    async componentDidMount() {
        const req = await this.props.dispatch(getFolders())
        return req
    }

    render() {
        return (
            <div className="grid-container">
                <ProjectType />
                <ProjectMains />
                <ProjectDates />
                <ProjectRoles />
                <button className="success button">Submit Project</button>
            </div>
        );
    }
}
