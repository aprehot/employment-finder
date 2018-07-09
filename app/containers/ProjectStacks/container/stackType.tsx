import * as React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import delay from 'delay';

import { getContents } from '../actions';
import DraggableStack from './draggableStack';
import { getProjectId } from '../../ProjectContainer/actions';
import { IReduxProps, actualProjectModel } from '../../userPost/projectInterface';
import { Keyframes, config, interpolate, Spring, animated as a } from 'react-spring'

// this component contains the logic for which stack is currently displaying its projects
// this component contains the smart component called draggable stack which controls the draggability logic for a stack 
const keyframes: any = Keyframes

const DropDown = keyframes.Spring({
    open: async (call: any) => {
        await call({
            to: {
                y: -100,
            },
            config: config.slow
        })
        await call({
            to: {
                y: 0,
            },
            config: config.slow
        })
    },
})


const mapStateToProps = ({ user }: IReduxProps) => ({ user })
@(connect(mapStateToProps, null) as any)
export default class StackType extends React.Component<any> {
    state: any = {
        limit: 5,
        showMore: true,
        activeStack: '',
        open: true
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
        const state = this.state.open && 'open'
        return (
            <React.Fragment>
                {folderContents &&
                    folderContents.projects.length > 0 &&
                    this.state.activeStack === folderClicked &&
                    folderContents.projects[0].parentCategory === category &&
                    <DropDown native state={state}>
                        {({ y }: any) => (
                            <a.div className="grid-x cell" style={{
                                transform: interpolate(
                                    [y], (y) =>
                                        `translate(1%, ${y}%)`
                                )
                            }}>
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
                            </a.div>
                        )}
                    </DropDown>
                }
            </React.Fragment>
        )
    }
    toggle = () => this.setState((state: any) => ({ open: true }))

    fetchFolderContents = (id: any, category: any) =>
        this.props.dispatch(getContents(id, category))

    handleActiveState = (id: any) =>
        this.setState({ activeStack: id })

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