import * as React from 'react';
import { connect } from 'react-redux';

import { getFolders } from '../ProjectStacks/actions'
import { ProjectDates, ProjectMains, ProjectTypes, ProjectRoles, ProjectTeams, ProjectOverview } from './projectPostExport'
import { IReduxProps } from './projectInterface';

interface IState {
    postPage: number,
    project: any
}

const mapStateToProps = ({ user, router, project }: IReduxProps) => ({ user, router, project })

@(connect(mapStateToProps, null) as any)
export default class PostingContainer extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.handleFormPage = this.handleFormPage.bind(this);
    }
    state: IState = {
        postPage: 0,
        project: {}
    }

    async componentDidMount() {
        if (!this.props.user.userFolders) {
            const req = await this.props.dispatch(getFolders())
            return req
        }
    }

    handleFormPage = (pageState: any, pageNumber: number, ) => (
        this.setState({
            postPage: pageNumber,
            project: [...this.state.project, pageState]
        })
    )

    render() {
        const { postPage } = this.state
        const { userFolders }: any = this.props.user
        return (
            <div className="grid-container">

                {postPage === 0 && <ProjectTypes handleForm={this.handleFormPage} />}
                {postPage === 1 && <ProjectMains userFolders={userFolders} handleForm={this.handleFormPage} />}
                {postPage === 2 && <ProjectDates handleForm={this.handleFormPage} />}
                {postPage === 3 && <ProjectRoles handleForm={this.handleFormPage} />}
                {postPage === 4 && <ProjectTeams handleForm={this.handleFormPage} />}
                {postPage === 5 && <ProjectOverview projectData={this.state.project} />}
            </div>
        );
    }
}
