import * as React from 'react';
import { FieldArray, Field, Formik, Form, FormikProps } from 'formik'
const Slider = require('rc-slider');

import TextInput from './textInput';
import 'rc-slider/assets/index.css';
import { IValues } from './projectInterface';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

interface IState {
    rolePressed: boolean,
    allRoles: {}[]
}

export default class ProjectRoles extends React.Component<IValues> {
    state: any = {
        rolePressed: false,
        allRoles: []
    }
    render() {
        return (
            <div className="grid-x align-center">
                <h3 className="text-center cell">Add Character</h3>
                <Formik
                    initialValues={{ roles: [] }}
                    onSubmit={values =>
                        // setTimeout(() => {
                        //     alert(JSON.stringify(values, null, 2));
                        // }, 500)
                        this.setState({ allRoles: [...this.state.allRoles, values.roles] })
                    }
                    render={({ values }) => (
                        <div className="grid-x cell align-center" >

                            <FieldArray
                                name="roles"
                                render={arrayHelpers => (
                                    <React.Fragment>
                                        <Form className="grid-x large-5 align-center">
                                            {!this.state.rolePressed ?
                                                <button
                                                    type="button"
                                                    className="hollow button secondary roleBtns"
                                                    onClick={() => {
                                                        this.setState({ rolePressed: true })
                                                        arrayHelpers.push({
                                                            roleType: '',
                                                            name: '',
                                                            gender: '',
                                                            ages: [],
                                                            specifics: '',
                                                            description: '',
                                                            isSag: false,
                                                            isOpen: false,
                                                            isLocal: false,
                                                            isOnOffer: false
                                                        })
                                                    }}
                                                >
                                                    <span style={{ fontSize: '30px' }}> &#43;  </span>
                                                    <span> Add a new Role</span>
                                                </button>

                                                :

                                                values.roles.map((role: any, index: number) => {
                                                    const lastIndex = values.roles.length - 1;
                                                    console.log(values.roles)
                                                    return index === lastIndex &&

                                                        <div key={`${role}.${index}`} className="grid-x cell">
                                                            <Field component="select" name={`roles.${index}.roleType`} className="cell">
                                                                <option disabled value="">Choose Role Type</option>
                                                                {/* TODO: add YUP validation to not trigger submit on this value */}
                                                                <option value="Lead">Lead</option>
                                                                <option value="Strong">Strong</option>
                                                                <option value="Supporting">Supporting</option>
                                                                <option value="Small">Small</option>
                                                                <option value="Cameo">Cameo</option>
                                                            </Field>
                                                            <Field
                                                                name={`roles.${index}.name`}
                                                                type="text"
                                                                placeholder="Character Name"
                                                                component={TextInput}
                                                            />
                                                            <Field
                                                                name={`roles.${index}.ages`}
                                                                render={(fieldProps: any) => (
                                                                    <div style={{ width: '400px', margin: '50px' }}>
                                                                        <p>Set Age Range</p>
                                                                        <Range
                                                                            min={5} max={80}
                                                                            defaultValue={[20, 48]}
                                                                            tipFormatter={(value: number) => `${value}`}
                                                                            onChange={(e: number) => fieldProps.form.setFieldValue(`roles.${index}.ages`, e)}
                                                                        />
                                                                    </div>
                                                                )}
                                                            />

                                                            <Field
                                                                name={`roles.${index}.gender`}
                                                                type="text"
                                                                placeholder="Gender"
                                                                component={TextInput}
                                                            />
                                                            <Field
                                                                name={`roles.${index}.specifics`}
                                                                type="text"
                                                                placeholder="Specifics"
                                                                component={TextInput}
                                                                statement2={"Example: Australian, Asian, Singer"}
                                                            />
                                                            <Field
                                                                name={`roles.${index}.description`}
                                                                render={({ field }: any) => (
                                                                    <textarea {...field} placeholder="Description" />
                                                                )}
                                                            />
                                                            <div className="boolFlex">
                                                                {['isSag', 'isOpen', 'isLocal', 'isOnOffer'].map((bool, ind) =>
                                                                    <Field
                                                                        key={`${bool}${ind}`}
                                                                        name={`roles.${index}.${bool}`}
                                                                        render={({ field }: any) => (
                                                                            <div className="switch" >
                                                                                <p className="boolLabel help-text" >{bool}</p>
                                                                                <input {...field}
                                                                                    type="checkbox"
                                                                                    className="switch-input"
                                                                                    id={`roles.${index}.${bool}`}
                                                                                    name={`roles.${index}.${bool}`}
                                                                                />
                                                                                <label className="switch-paddle" htmlFor={`roles.${index}.${bool}`} >
                                                                                    {console.log(values.roles[index].bool)}
                                                                                    <span className="show-for-sr">is Sag?</span>
                                                                                </label>
                                                                            </div>
                                                                        )
                                                                        }
                                                                    />
                                                                )}
                                                            </div>
                                                            <div className="roleEvents grid-x cell">
                                                                <button
                                                                    type="submit"
                                                                    className="button secondary cell shrink"
                                                                    onClick={() => (this.setState({ rolePressed: false }))}
                                                                > Add</button>
                                                                <button
                                                                    type="button"
                                                                    className="button alert roleBtns cell shrink"
                                                                    onClick={() => {
                                                                        this.setState({ rolePressed: false })
                                                                        arrayHelpers.remove(index)
                                                                    }} > cancel </button>
                                                            </div>
                                                        </div>
                                                })
                                            }
                                        </Form>

                                        <ul className="grid-x">
                                            {this.state.rolePressed === false && values.roles.map((role: any, i: number) => (
                                                <li className="roleCard callout large-3 cell " key={`${role}${i}`}>
                                                    <button className="close-button alert" onClick={() => arrayHelpers.remove(i)}>
                                                        <span aria-hidden="true" style={{ color: 'white' }}>&times;</span>
                                                    </button>
                                                    <h5>Role Type: {role.roleType}</h5>
                                                    <h4>Character Name: {role.name}</h4>
                                                    <h5>Gender: {role.gender}</h5>
                                                    <h6>MinAge: {role.ages[0]}</h6>
                                                    <h6>MaxAge: {role.ages[1]}</h6>
                                                    <div className="secondary button-group fieldset">
                                                        <legend className="cell">Yes/No</legend>
                                                        <a className={`${role.isSag ? 'successCheck' : 'alertCheck'} button`}>is Sag? {role.isSag ? 'yes' : 'no'}</a>
                                                        <a className={`${role.isOpen ? 'successCheck' : 'alertCheck'} button`}>is Open? {role.isOpen ? 'yes' : 'no'}</a>
                                                        <a className={`${role.isLocal ? 'successCheck' : 'alertCheck'} button`}>is Local? {role.isLocal ? 'yes' : 'no'}</a>
                                                        <a className={`${role.isOnOffer ? 'successCheck' : 'alertCheck'} button`}>is on Offer? {role.isOnOffer ? 'yes' : 'no'}</a>
                                                    </div>
                                                    <p>{role.specifics}</p>
                                                    <p>{role.description}</p>
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
