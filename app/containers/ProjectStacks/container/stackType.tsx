import * as React from 'react';
import { connect } from 'react-redux';

import { getContents } from '../actions';
import { IReduxProps, actualProjectModel } from '../../userPost/projectInterface';
import { getProjectId } from '../../ProjectContainer/actions';
import { Link } from 'react-router-dom';
import DraggableStack from '../component/draggableStack';


const mapStateToProps = ({ user }: IReduxProps) => ({ user })

@(connect(mapStateToProps, null) as any)
export default class StackType extends React.Component<any> {
    state: any = {
        limit: 5,
        showMore: true,
        activeStack: ''
    }

    showMore = () => {
        this.setState({
            // do not show the button any more
            showMore: false,
            // set limit to current count
            // what happens if the comments increase?
            limit: this.props.stackTypes.length
        });
    }

    renderButton = () => {
        // show button only if state.showMore set to true
        if (!this.state.showMore) return null;
        return (
            <button
                onClick={this.showMore}
                className="button tertiary seeMore">
                See More
            </button>
        );
    }

    showContents = (
        folderClicked: string,
        folderContents: IReduxProps['user']['folderContents'],
        category: string
    ) => {
        return (
            <React.Fragment>
                {folderContents &&
                    folderContents.projects.length > 0 && //switch this line and one below 
                    this.state.activeStack === folderClicked &&
                    folderContents.projects[0].parentCategory === category &&
                    <div className="grid-x cell">
                        {folderContents.projects.map((project: actualProjectModel['projects'], i: number) => (
                            <Link
                                key={`${project.title}${i}`}
                                className="stackProjects"
                                to={`/project/${project._id}`}
                                onClick={() => this.props.dispatch(getProjectId(project._id))}
                            >
                                <h6 className="projectTitle">
                                    {project.title}
                                </h6>
                            </Link>
                        ))}
                    </div>
                }
            </React.Fragment>
        )
    }


    fetchFolderContents = (id: any, category: any) => {
        console.log(id, category)
        this.props.dispatch(getContents(id, category))
    }


    handleActiveState = (id: any) => (
        this.setState({ activeStack: id })
    )



    render() {

        const { stackTypes, category }: any = this.props;
        const { folderContents }: any = this.props.user;
        return (
            <React.Fragment>
                {stackTypes && stackTypes
                    .filter((stackType: any) => stackType.category === category)
                    .slice(0, this.state.limit)
                    .map((stack: any, i: number) => (
                        <DraggableStack
                            stack={stack}
                            key={stack._id}
                            ref='stack'
                            category={category}
                            handleActiveState={this.handleActiveState}
                            fetchFolderContents={this.fetchFolderContents}
                        />
                    ))}

                {this.renderButton()}
                {this.showContents(this.state.activeStack, folderContents, category)}

            </React.Fragment>
        )
    }
}