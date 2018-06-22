import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { actionBtn } from './actions'


const mapStateToProps = ({ project }: any) => ({ project })

class ProjectType extends React.PureComponent {
    state: any = { activeBtn: undefined }

    render() {
        const { dispatch }: any = this.props
        const { activeBtn } = this.state
        return (
            <div className="grid-x text-center align-center">
                <h1 id="addProjTitle">New Project</h1>
                <h3 className="cell">What kind of project is it?</h3>
                {[
                    { uni: "\uD83D\uDCFD", type: 'Film' },
                    { uni: "\uD83D\uDCFA", type: 'TV Show' },
                    { uni: "\uD83D\uDCBB", type: 'Digital' },
                    { uni: "\uD83C\uDFAD", type: 'Theater' }
                ].map((btn, i) => {
                    return (
                        <div key={i} className="cell grid-x large-6 align-center">
                            <div
                                className={`mainUni cell shrink ${activeBtn === i && 'activeBtn'}`}
                                onClick={() => {
                                    this.setState({ activeBtn: i })
                                    dispatch(actionBtn(btn.type))
                                }}
                            >
                                {btn.uni}
                            </div>
                            <span className="cell">{btn.type}</span>
                        </div>
                    )
                }
                )}
                <button type="submit" className="button secondary">Next</button>
            </div >


        );
    }
}

export default connect(
    mapStateToProps,
)(ProjectType);