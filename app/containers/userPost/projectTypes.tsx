import React, { Fragment } from 'react';
import { connect } from 'react-redux';
// import { actionBtn } from './actions'

interface IHandleForm {
    handleForm: (action: any, action2: number) => void
}

const mapStateToProps = ({ project }: any) => ({ project })

class ProjectTypes extends React.PureComponent<IHandleForm> {

    state: any = {
        activeBtn: undefined,
        projectType: '',
        err: undefined
    }

    render() {
        const { dispatch }: any = this.props
        const { activeBtn } = this.state
        console.log(this.state.activeBtn)
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
                                    this.setState({
                                        activeBtn: i,
                                        projectType: btn.type
                                    })
                                }}
                            >
                                {btn.uni}
                            </div>
                            <span className="cell">{btn.type}</span>
                        </div>
                    )
                }
                )}
                {this.state.err && <h5 className="errorTxt">{this.state.err}</h5>}
                <button type="submit" onClick={() => {
                    typeof this.state.activeBtn === 'number' ?
                        this.props.handleForm({ projectType: this.state.projectType }, 1)
                        :
                        this.setState({ err: 'Please Choose a project Type' })
                }} className="button secondary">
                    Next</button>
            </div >


        );
    }
}

export default connect(
    mapStateToProps,
)(ProjectTypes);