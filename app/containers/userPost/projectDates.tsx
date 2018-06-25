import React from 'react';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import DatePicker from 'react-date-picker';
import { withFormik, FormikProps, Form, Field } from 'formik';

import TextInput from './textInput';
import { handleStartDate, handleEndDate } from './actions';
import { IValues, OtherProps, postProps } from './projectInterface'


const ProjectDates = (props: OtherProps & FormikProps<IValues>) => {
    const {
        values,
        dispatch,
        handleSubmit,
        errors,
        project,
        touched,
        isSubmitting,
    } = props;
    const validate = (name: string) => {
        const error: any = errors[name]
        const touch: any = touched[name]
        return touch && error && <h6>{error}</h6>
    }
    return (
        <React.Fragment>
            <Form className="formProject" >
                <div className="grid-x text-center">
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
                    <button
                        type="submit"

                        onClick={() => {
                            dispatch(handleStartDate(''))
                            dispatch(handleEndDate(''))
                        }
                        }
                        // disabled={isSubmitting} Do not use async/subscription when putting in parent state
                        className="button secondary">
                        Next</button>
                </div>
            </Form >
        </React.Fragment>
    )
}
const mapStateToProps = ({ router, project }: postProps) => {
    return { router, project }
}
const FormikEnhancer = withFormik<postProps, IValues>({
    mapPropsToValues: ({ user, project }: postProps) => {
        const { projectRoles } = project
        return {
            startDate: '',
            wrapDate: '',
            location: '',
            budget: 0,
            genres: '',
            premise: '',
        }
    },
    validationSchema: Yup.object().shape({
        location: Yup.string().required(),
        budget: Yup.number().positive().required(),
        genres: Yup.string().required(),
        premise: Yup.string().required()
    }),
    handleSubmit: (values, { props, setErrors, resetForm, setSubmitting }) => {
        if (Date.parse(values.startDate) >= Date.parse(values.wrapDate)) {
            setErrors({ startDate: 'start date cannot exceed end date' })
        } else {
            props.handleForm(values, 3)
        }
        // setSubmitting(false) do not use async/subscription when putting in parent state
    },
})(ProjectDates)

export default connect(mapStateToProps)(FormikEnhancer)
