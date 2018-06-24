import * as React from 'react';
import { FieldArray, Field, Formik, Form, FormikProps } from 'formik'

import TextInput from './textInput';
import { IValues } from './projectInterface';
import { ITeam } from './projectInterface';

interface IState {
    teamPressed: boolean
}

export default class ProjectTeams extends React.PureComponent<IValues> {
    state: IState = {
        teamPressed: false
    }
    render() {
        return (
            <div className="grid-x align-center">
                <h3 className="text-center cell">Who is the Team?</h3>
                <Formik
                    initialValues={{ teams: [] }}
                    onSubmit={values =>
                        // console.log(values)
                        this.props.handleForm({ teams: values.teams }, 5)
                    }
                    render={({ values }) => (
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
                                                            Admin: false,
                                                            Collaborator: false
                                                        })
                                                    }}
                                                >
                                                    <span style={{ fontSize: '30px' }}> &#43;  </span>
                                                    <span> Add a team member</span>
                                                </button>
                                                :
                                                values.teams.map((team: ITeam, index: number) => {
                                                    const lastIndex = values.teams.length - 1;
                                                    return index === lastIndex &&
                                                        <div key={`${team}.${index}`} className="grid-x cell">
                                                            <Field component="select" name={`teams.${index}.job`} className="cell">
                                                                <option disabled value="">Team member's job?</option>
                                                                {/* TODO: add YUP validation to not trigger submit on this value */}
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

                                                            <Field
                                                                name={`teams.${index}.email`}
                                                                type="email"
                                                                placeholder="Enter Email Address"
                                                                component={TextInput}
                                                            />
                                                            <div className="boolFlex">
                                                                {['Admin', 'Collaborator'].map((bool: string, ind: number) =>
                                                                    <Field
                                                                        key={`${bool}${ind}`}
                                                                        name={`teams.${index}.${bool}`}
                                                                        render={({ field }: any) => (
                                                                            <div className="switch" >
                                                                                <p className="boolLabel help-text" >{bool}</p>
                                                                                <input {...field}
                                                                                    type="checkbox"
                                                                                    className="switch-input"
                                                                                    id={`teams.${index}.${bool}`}
                                                                                    name={`teams.${index}.${bool}`}
                                                                                />
                                                                                <label className="switch-paddle" htmlFor={`teams.${index}.${bool}`} >
                                                                                    <span className="show-for-sr">{bool}</span>
                                                                                </label>
                                                                            </div>
                                                                        )}
                                                                    />
                                                                )}
                                                            </div>

                                                            <div className="roleEvents grid-x cell">
                                                                <button
                                                                    type="submit"
                                                                    className="button secondary cell shrink"
                                                                    onClick={() => (this.setState({ teamPressed: false }))}
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
                                                })
                                            }
                                            {values.teams.length > 0 &&
                                                this.state.teamPressed === false &&
                                                <button type="submit" className="button warning">Submit Team</button>}
                                        </Form>

                                        <ul className="grid-x">
                                            {this.state.teamPressed === false &&
                                                values.teams.map((team: ITeam, i: number) => (
                                                    <li className="roleCard callout large-3 cell " key={`${team}${i}`}>
                                                        <button className="close-button alert" onClick={() => arrayHelpers.remove(i)}>
                                                            <span aria-hidden="true" style={{ color: 'white' }}>&times;</span>
                                                        </button>
                                                        <h5>Job Type: {team.job}</h5>
                                                        <h4>Member Name: {team.name}</h4>
                                                        <h5>Email: {team.email}</h5>
                                                        <div className="secondary button-group fieldset">
                                                            <legend className="cell">Priviledges</legend>
                                                            {['Admin', 'Collaborator'
                                                            ].map((bool: string, indx: number) => (
                                                                <React.Fragment key={`${bool}${indx}`}>
                                                                    <span> {bool}?: {team[bool] ? 'yes' : 'no'} </span>
                                                                    <span
                                                                        key={`${bool}${indx}`}
                                                                        className={`${team[bool] ? 'successBox' : 'alertBox'} button`}
                                                                    >
                                                                        <p className="boolLabel help-text" >
                                                                            {bool === 'Admin' ? 'Access to the private page' : 'Access to edit shared page'}
                                                                        </p>
                                                                    </span>
                                                                </React.Fragment>
                                                            )
                                                            )}
                                                        </div>
                                                    </li>
                                                ))}
                                        </ul>
                                    </React.Fragment>
                                )}
                            />
                        </div>

                    )}
                />
            </div>
        );
    }
}
