// /* eslint-disable */
import React from 'react';
import {
    withFormik,
    FormikProps,
    Form,
    Field,
    FieldArray,
    FieldProps
} from 'formik';
import * as Yup from 'yup';
import DatePicker from 'react-date-picker';
import { connect } from 'react-redux';

import './styles.scss';
import { IProps } from '../Login/LoginForm';
import { handleStartDate, handleEndDate } from './actions';
import TextInput from './textInput';

interface IValues {
    title?: string,
    studio?: string,
    startDate?: string,
    wrapDate?: string,
    location?: string
    budget?: number,
    genres?: string,
    premise?: string,
    roles?: any
}
interface OtherProps {
    dispatch?: (action: any) => void;
    project?: {
        projectStart: Date,
        projectEnd: Date,
    }
}
interface postProps {
    user?: IProps['user'],
    router?: IProps['router'],
    project?: IProps['project'],
    registerField: any,
    unregisterField: any
}

const UserPost = (props: OtherProps & FormikProps<IValues>) => {
    const {
        values,
        // handleChange,
        handleBlur,
        dispatch,
        handleSubmit,
        errors,
        project,
        touched,
        isSubmitting
    } = props;
    const validate = (name: string) => {
        const error: any = errors[name]
        const touch: any = touched[name]
        return touch && error && <h6>{error}</h6>
    }
    return (
        <div className="grid-container">
            <Form className="formProject" >
                <h1 id="addProjTitle">New Project</h1>
                <h3>What kind of project is it?</h3>
                <div className="grid-x text-center">
                    {[
                        { uni: "\uD83D\uDCFD", type: 'Film' },
                        { uni: "\uD83D\uDCFA", type: 'TV Show' },
                        { uni: "\uD83D\uDCBB", type: 'Digital' },
                        { uni: "\uD83C\uDFAD", type: 'Theater' }
                    ].map((btn, i) => (
                        <div key={i} className="cell large-6 grid-x align-center">
                            <div
                                className="mainUni cell shrink"
                                onClick={() => { props.setFieldValue('projectType', btn.type) }}
                            >
                                {btn.uni}
                            </div>
                            <span className="cell">{btn.type}</span>
                        </div>
                    )
                    )
                    }
                    <Field
                        name="title"
                        type="text"
                        component={TextInput}
                        label="What is this project called?"
                    />
                    <Field
                        name="studio"
                        type="text"
                        component={TextInput}
                        label="Enter Studio or Network"
                    />
                    <div className='postDates'>
                        <h3>What are the shoot dates?</h3>
                        <div className='postDates'>
                            <h4>Start</h4>
                            <DatePicker
                                name="startDate"
                                returnValue="start"
                                minDate={new Date()}
                                locale={'en-US'}
                                value={project.projectStart}
                                onChange={(e) => {
                                    dispatch(handleStartDate(e))
                                    props.setFieldValue('startDate', e.toLocaleDateString('en-US'))
                                }}
                            />
                        </div>
                        <div className='postDates'>
                            <h4>Wrap</h4>
                            <DatePicker
                                name="wrapDate"
                                returnValue="end"
                                minDate={new Date()}
                                value={project.projectEnd}
                                onChange={(e) => {
                                    dispatch(handleEndDate(e))
                                    props.setFieldValue('wrapDate', e.toLocaleDateString('en-US'))
                                }}
                            />
                        </div>
                    </div>
                    {validate('startDate')}
                    <Field
                        name="location"
                        type="text"
                        roleclass="postProj"
                        component={TextInput}
                        label="Where is it Shooting?"
                        statement1={`type in full city or country`}
                        statement2={`Example: Los Angeles, United Kingdom`}
                    />
                    <Field
                        name="budget"
                        type="number"
                        label="Budget"
                        roleclass="postProj"
                        component={TextInput}
                    />
                    <div className="postProj">
                        <Field
                            name="genres"
                            type="text"
                            component={TextInput}
                            label="What's the story about?"
                            statement1={'Example: Action; Comedy'}
                        />
                        <Field
                            name="premise"
                            render={({ field }: any) => (
                                <textarea {...field} className="shrink" placeholder="Premise" />
                            )}
                        />
                        {validate('premise')}
                    </div>
                    <button type="submit" disabled={isSubmitting} className="button secondary">Submit</button>
                </div>
            </Form >
        </div >
    )
}
const mapStateToProps = ({ user, router, project }: postProps) => {
    return { user, router, project }
}
const FormikEnhancer = withFormik<postProps, IValues>({
    mapPropsToValues: ({ user, project }: postProps) => {
        const { projectRoles } = project
        return {
            ownerId: user.payload.id,
            parentFolder: {},
            parentCategory: {},
            projectType: '',
            title: '',
            studio: '',
            startDate: '',
            wrapDate: '',
            location: '',
            budget: 0,
            genres: '',
            premise: '',
            roles: projectRoles,
            teams: [],
        }
    },
    validationSchema: Yup.object().shape({
        title: Yup.string().min(2).required(),
        studio: Yup.string().min(3).required(),
        location: Yup.string().required(),
        budget: Yup.number().positive().integer().required(),
        genres: Yup.string().required(),
        premise: Yup.string().min(8).required()
    }),
    handleSubmit: (values, { setErrors, resetForm, setSubmitting }) => {
        if (Date.parse(values.startDate) >= Date.parse(values.wrapDate)) {
            setErrors({ startDate: 'start date cannot exceed end date' })
        } else {
            resetForm()
        }
        console.log(values)
        setSubmitting(false)
    },
})(UserPost)

export default connect(mapStateToProps)(FormikEnhancer)
