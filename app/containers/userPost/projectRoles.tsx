import * as React from 'react';
import { FieldArray, Field, Formik, Form, FormikProps } from 'formik'
const Slider = require('rc-slider');
import * as yup from 'yup';

import TextInput from './textInput';
import 'rc-slider/assets/index.css';
import { IValues } from './projectInterface';
import { IRole } from './projectInterface';
import ReviewRole from './decoupled/reviewRole';

const createSliderWithTooltip = Slider.createSliderWithTooltip;
const Range = createSliderWithTooltip(Slider.Range);

interface IState {
    rolePressed: boolean,
}


const schema = yup.object().shape({
    roles: yup.array()
        .of(
            yup.object().shape({
                roleType: yup.string().required('Roles must have a type'),
                name: yup.string().required('Roles must have a name'),
                gender: yup.string().required('Roles must have a gender'),
                description: yup.string().required('Roles must have a description')
            })
        ),
})
export default class ProjectRoles extends React.PureComponent<IValues> {
    state: IState = {
        rolePressed: false
    }

    render() {

        const { rolePressed } = this.state
        return (
            <div className="grid-x align-center">
                <h3 className="text-center cell">Add Character</h3>
                <Formik
                    validationSchema={schema}
                    initialValues={{ roles: [] }}
                    onSubmit={(values) => this.props.handleForm({ roles: values.roles }, 4)
                    }
                    render={({ values, errors, touched }) => {
                        return (
                            <div className="grid-x cell align-center" >
                                <FieldArray
                                    name="roles"
                                    render={arrayHelpers => (
                                        <React.Fragment>
                                            <Form className="grid-x large-5 align-center">

                                                {!rolePressed
                                                    ?
                                                    <button
                                                        type="button"
                                                        className="hollow button secondary roleBtns"
                                                        onClick={() => {
                                                            this.setState({ rolePressed: true })
                                                            arrayHelpers.push({
                                                                roleType: '',
                                                                name: '',
                                                                gender: '',
                                                                ages: [20, 48],
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
                                                    values.roles.map((role: IRole, index: number) => {
                                                        const lastIndex = values.roles.length - 1;

                                                        if (index === lastIndex || values.roles.length === 1) {
                                                            const validate = (name: string) => {
                                                                const error: any = errors.roles && errors.roles[index] && errors.roles[index][name]
                                                                const touch: any = touched.roles && touched.roles[index] && touched.roles[index][name]
                                                                return touch && error && <h6 className="errorTxt">{error}</h6>
                                                            }
                                                            return (
                                                                <div key={`${role}.${index}`} className="grid-x cell">
                                                                    <Field component="select" name={`roles.${index}.roleType`} className="cell">
                                                                        <option value=''>Choose Role Type</option>
                                                                        <option value="Lead">Lead</option>
                                                                        <option value="Strong">Strong</option>
                                                                        <option value="Supporting">Supporting</option>
                                                                        <option value="Small">Small</option>
                                                                        <option value="Cameo">Cameo</option>
                                                                    </Field>
                                                                    <Field
                                                                        type="text"
                                                                        component={TextInput}
                                                                        placeholder="Character Name"
                                                                        name={`roles.${index}.name`}
                                                                    />
                                                                    {validate(`name`)}
                                                                    <Field
                                                                        name={`roles.${index}.ages`}
                                                                        render={(fieldProps: any) => (
                                                                            <div style={{ width: '400px', margin: '50px' }}>
                                                                                <p>Set Age Range</p>
                                                                                <Range
                                                                                    min={5} max={80}
                                                                                    defaultValue={[20, 48]}
                                                                                    tipFormatter={(value: number) => `${value}`}
                                                                                    onChange={(e: number) =>
                                                                                        fieldProps.form.setFieldValue(`roles.${index}.ages`, e)}
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
                                                                    {validate(`gender`)}
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
                                                                    {validate(`description`)}
                                                                    <div className="boolFlex">
                                                                        {['isSag', 'isOpen', 'isLocal', 'isOnOffer'].map((bool: string, ind: number) =>
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
                                                                            onClick={(e) => {
                                                                                if (errors.roles && errors.roles[index] !== null) {
                                                                                    e.preventDefault()
                                                                                } else if (values.roles[index].roleType === "") {
                                                                                    e.preventDefault()
                                                                                } else {
                                                                                    this.setState({ rolePressed: false })
                                                                                }
                                                                            }}
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
                                                            )
                                                        }
                                                        return console.log('')
                                                    })
                                                }
                                                {values.roles.length > 0 &&
                                                    rolePressed === false &&
                                                    <button type="submit" className="button warning">Submit Roles</button>}
                                            </Form>

                                            <ul className="grid-x">
                                                {rolePressed === false &&
                                                    values.roles.map((role: IRole, i: number) => (

                                                        <ReviewRole role={role} key={`${role.name}${i}`} index={i} arrayHelpers={arrayHelpers} />

                                                    ))}
                                            </ul>
                                        </React.Fragment>
                                    )}
                                />

                            </div>
                        )
                    }}
                />
            </div>
        );
    }
}
