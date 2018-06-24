import * as React from 'react';
import { connect } from 'react-redux';

import { IProps } from '../Login/LoginForm';
import { getFolders } from '../UserFolders/actions'
import { postProj } from './actions';
import { ProjectDates, ProjectMains, ProjectTypes, ProjectRoles, ProjectTeams, ProjectOverview } from './projectPostExport'

interface IState {
    postPage: number,
    project: any
}

const mapStateToProps = ({ user, router, project }: IProps) => ({ user, router, project })

@(connect(mapStateToProps, null) as any)
export default class PostingContainer extends React.Component<any, IState> {
    constructor(props: any) {
        super(props)
        this.handleFormPage = this.handleFormPage.bind(this);
        this.postProject = this.postProject.bind(this);
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

    postProject = () => this.props.dispatch(postProj(this.state.project))


    render() {
        const { postPage } = this.state
        const { userFolders }: any = this.props.user
        console.log(this.state.project)
        return (
            <div className="grid-container">

                {postPage === 0 && <ProjectTypes handleForm={this.handleFormPage} />}
                {postPage === 1 && <ProjectMains userFolders={userFolders} handleForm={this.handleFormPage} />}
                {postPage === 2 && <ProjectDates handleForm={this.handleFormPage} />}
                {postPage === 3 && <ProjectRoles handleForm={this.handleFormPage} />}
                {postPage === 4 && <ProjectTeams handleForm={this.handleFormPage} />}
                {postPage === 5 && <ProjectOverview postProject={this.postProject} />}
            </div>
        );
    }
}
