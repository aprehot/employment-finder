import * as React from 'react';
import { connect } from 'react-redux';

import { getContents } from '../actions';
import { IReduxProps, actualProjectModel } from '../../userPost/projectInterface';
import { getProjectId } from '../../ProjectContainer/actions';
import { Link } from 'react-router-dom';
import WithDrag, { Gucci } from './dragBox';


const mapStateToProps = ({ user }: IReduxProps) => ({ user })

@(connect(mapStateToProps, null) as any)
export default class StackType extends React.PureComponent<any> {
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

    render() {


        const { hasCapture, circleLeft, circleTop, tranStyle } = this.state;

        let circleStyle = {
            // width: CIRCLE_SIZE,
            // height: CIRCLE_SIZE,
            // borderRadius: CIRCLE_SIZE / 2,
            position: "absolute",
            left: circleLeft,
            cursor: "grab",
            top: circleTop,
            transition: tranStyle,
            backgroundColor: hasCapture ? "blue" : "green"
        };


        const { stackTypes, category }: any = this.props;
        const { folderContents }: any = this.props.user;
        return (
            <React.Fragment>
                {stackTypes && stackTypes
                    .filter((stackType: any) => stackType.category === category)
                    .slice(0, this.state.limit)
                    .map((stack: any, i: number) => (
                        <div
                            key={stack._id}
                            className="stack cell large-2"
                            id={stack.folderName}
                            onClick={(event) => {
                                const { id }: any = event.target
                                this.props.dispatch(getContents(id, category));
                                this.setState({ activeStack: id })
                            }}
                        >
                            <h6 style={{
                                pointerEvents: 'none'
                            }}>
                                {stack.folderName}
                            </h6>
                        </div>
                    ))}

                {this.renderButton()}
                {this.showContents(this.state.activeStack, folderContents, category)}

            </React.Fragment>
        )
    }
}