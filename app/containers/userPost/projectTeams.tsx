import * as React from 'react';
import { FieldArray, Field, Formik, Form, FormikProps } from 'formik'
import * as Yup from 'yup';

import TextInput from './textInput';
import { IValues } from './projectInterface';
import { ITeam } from './projectInterface';
import ReviewTeam from './decoupled/reviewTeam';
import RadioPriviledge from './decoupled/radioPriviledge';

interface IState {
    teamPressed: boolean,
    privErr: boolean,
    currentChecked: string
}


export default class ProjectTeams extends React.PureComponent<IValues> {
    state: IState = {
        teamPressed: false,
        privErr: false,
        currentChecked: ''
    }

    setChecked = (target: string) => {
        this.setState({ currentChecked: target })
    }

    render() {
        const { currentChecked } = this.state
        return (
            <div className="grid-x align-center">
                <h3 className="text-center cell">Who is the Team?</h3>
                <Formik
                    validationSchema={Yup.object().shape({
                        teams: Yup.array()
                            .of(
                                Yup.object().shape({
                                    job: Yup.string().required('A Team member must have a job'),
                                    name: Yup.string().required('A Team member requires a name'),
                                    email: Yup.string().required('Team member requires an email'),
                                    priviledge: Yup.string().required('A priviledge type is required')
                                })
                            ),
                    })}
                    initialValues={{ teams: [] }}
                    onSubmit={(values) =>
                        this.props.handleForm({ teams: values.teams }, 5)
                    }
                    render={({ values, errors, touched }) => (
                        <div className="grid-x cell align-center" >
                            <FieldArray
                                name="teams"
                                render={arrayHelpers => (
                                    <React.Fragment>
                                        <Form className="grid-x large-5 align-center">
                                            {!this.state.teamPressed
                                                ?
                                                <button
                                                    type="button"
                                                    className="hollow button secondary roleBtns"
                                                    onClick={() => {
                                                        this.setState({ teamPressed: true })
                                                        arrayHelpers.push({
                                                            job: '',
                                                            name: '',
                                                            email: '',
                                                            priviledge: ''
                                                        })
                                                    }}
                                                >
                                                    <span style={{ fontSize: '30px' }}> &#43;  </span>
                                                    <span> Add a team member</span>
                                                </button>
                                                :
                                                values.teams.map((team: ITeam, index: number) => {
                                                    const lastIndex = values.teams.length - 1;


                                                    if (index === lastIndex || values.teams.length === 1) {
                                                        const validate = (name: string) => {
                                                            const error: any = errors.teams && errors.teams[index] && errors.teams[index][name]
                                                            const touch: any = touched.teams && touched.teams[index] && touched.teams[index][name]
                                                            return touch && error && <h6 className="errorTxt">{error}</h6>
                                                        }
                                                        return (
                                                            <div key={`${team}.${index}`} className="grid-x cell">
                                                                <Field component="select" name={`teams.${index}.job`} className="cell">
                                                                    <option value=''>Team member's job?</option>
                                                                    <option value="producer">Producer</option>
                                                                    <option value="executive">Executive</option>
                                                                    <option value="director">Director</option>
                                                                    <option value="writer">Writer</option>
                                                                    <option value="castingDirector">Casting Director</option>
                                                                    <option value="talent">Talent</option>
                                                                </Field>
                                                                <Field
                                                                    type="text"
                                                                    component={TextInput}
                                                                    placeholder="Name"
                                                                    name={`teams.${index}.name`}
                                                                />
                                                                {validate(`name`)}
                                                                <Field
                                                                    name={`teams.${index}.email`}
                                                                    type="email"
                                                                    placeholder="Enter Email Address"
                                                                    component={TextInput}
                                                                />
                                                                {validate(`email`)}
                                                                <div className="boolFlex">

                                                                    <Field
                                                                        name={`teams.${index}.priviledge`}
                                                                        render={({ field, form }: any) => (
                                                                            <fieldset >
                                                                                <legend>Choose The Priviledge</legend>
                                                                                {['admin', 'collab', 'viewer', 'downloader'].map((radioType) =>
                                                                                    <RadioPriviledge
                                                                                        currentChecked={currentChecked}
                                                                                        ind={index}
                                                                                        form={form}
                                                                                        setChecked={this.setChecked}
                                                                                        radioType={radioType}
                                                                                    />
                                                                                )}

                                                                            </fieldset>
                                                                        )
                                                                        }
                                                                    />
                                                                    {
                                                                        this.state.privErr && errors.teams &&
                                                                        errors.teams[index] && errors.teams[index].priviledge &&
                                                                        <div className="errorTxt">Priviledge Type is Required</div>
                                                                    }
                                                                </div>

                                                                <div className="roleEvents grid-x cell">
                                                                    <button
                                                                        type="submit"
                                                                        className="button secondary cell shrink"
                                                                        onClick={(e) => {
                                                                            if (errors.teams && errors.teams[index] !== null) {
                                                                                e.preventDefault()
                                                                                this.setState({ privErr: true })
                                                                            } else if (values.teams[index].job === "") {
                                                                                e.preventDefault()
                                                                                this.setState({ privErr: true })
                                                                            } else {
                                                                                this.setState({ teamPressed: false })
                                                                                this.setState({ privErr: false })
                                                                            }
                                                                        }}
                                                                    > Add</button>
                                                                    <button
                                                                        type="button"
                                                                        className="button alert roleBtns cell shrink"
                                                                        onClick={() => {
                                                                            this.setState({ teamPressed: false })
                                                                            arrayHelpers.remove(index)
                                                                        }} > cancel </button>
                                                                </div>
                                                            </div>
                                                        )
                                                    }
                                                    return console.log('next')
                                                })
                                            }
                                            {values.teams.length > 0 &&
                                                this.state.teamPressed === false &&
                                                <button type="submit" className="button warning">Submit Team</button>}
                                        </Form>

                                        <ul className="grid-x">
                                            {this.state.teamPressed === false &&
                                                values.teams.map((team: ITeam, i: number) => (
                                                    <ReviewTeam team={team} key={`${team.name}${i}`} index={i} arrayHelpers={arrayHelpers} />
                                                ))}
                                        </ul>
                                    </React.Fragment>
                                )
                                }
                            />
                        </div>
                    )
                    }
                />

            </div>
        );
    }
}
