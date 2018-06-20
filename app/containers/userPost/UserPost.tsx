// /* eslint-disable */
import React from 'react';
import {
    withFormik,
    FormikProps,
    Form,
    Field,
    FieldArray,
} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import './styles.scss';
import { handleProjectType, handleStartDate, handleEndDate } from './actions';
import DatePicker from 'react-date-picker';

interface IValues {
    text?: string,
    title?: string,
    studio?: string,
    number?: number,
    location?: string,
    budget?: number,
    genres?: string,
    premise?: string,
    startDate?: string,
    wrapDate?: string,
    name?: any,
    projectStart?: string,
    projectEnd?: string,
    projectType?: string
}
interface OtherProps {  // important to set these to optional if not used by FormikEnhancer
    text?: string;
    dispatch?: (action: any) => void;
    project?: {
        projectStart: Date,
        projectEnd: Date
    }
}
interface postProps {
    title?: string,
    user?: any,
    router?: any,
    project?: any
}

const UserPost = (props: OtherProps & FormikProps<IValues>) => {
    const {
        values,
        handleChange,
        dispatch,
        handleSubmit,
        errors,
        project,
        touched
    } = props;
    return (
        <div className="grid-container">
            <Form className="formProject" >
                <h1 style={{ flex: '1 1 100%', textAlign: 'center' }}>New Project</h1>
                <h3>What kind of project is it?</h3>
                <div className="grid-x text-center">
                    {[
                        { uni: "\uD83D\uDCFD", type: 'Film' },
                        { uni: "\uD83D\uDCFA", type: 'TV Show' },
                        { uni: "\uD83D\uDCBB", type: 'Digital' },
                        { uni: "\uD83C\uDFAD", type: 'Theater' }
                    ].map((btn, i) => {
                        return (
                            <div key={i} className="cell large-6 grid-x align-center">
                                <div
                                    onClick={() => dispatch(handleProjectType(btn.type))}
                                    className="mainUni cell shrink"
                                >
                                    {btn.uni}
                                </div>
                                <span className="cell">{btn.type}</span>
                            </div>
                        )
                    })
                    }
                    <h3>What is this project called? </h3> {touched.title && errors.title && <h6>{errors.title}</h6>}
                    <Field type="text" name="title" placeholder="Enter Title" />
                    <h3>Who is financing this project? </h3> {touched.studio && errors.studio && <h6>{errors.studio}</h6>}
                    <Field type="text" name="studio" placeholder="Enter Studio or Network" />
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
                                }
                                }
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
                                }
                                }
                            />
                        </div>
                    </div>
                    {touched.startDate && errors.startDate && <h6>{errors.startDate}</h6>}
                    <div className="postShoot">
                        <h3>Where is it shooting? </h3>
                        {touched.location && errors.location && <h6>{errors.location}</h6>}
                        <Field className="shrink" type="text" name="location" placeholder="Enter Location" />
                        <p>type in full city or country{`\n`}</p>
                        <p>Example: Los Angeles, United Kingdom</p>
                    </div>
                    <div className="postShoot">
                        <h3>What is the Production Budget? </h3>
                        {touched.budget && errors.budget && <h6>{errors.budget}</h6>}
                        <Field className="shrink" type="number" name="budget" placeholder="#" />
                    </div>
                    <div className="postShoot">
                        <h3>What's the story about? </h3>
                        {touched.genres && errors.genres && <h6>{errors.genres}</h6>}
                        <Field className="shrink" type="text" name="genres" placeholder="Genres" />
                        <p>Example: Action; Comedy{`\n`}</p>
                        <Field
                            name="premise"
                            render={({ field }) => (
                                <textarea {...field} className="shrink" placeholder="Premise" />
                            )}
                        />
                        {touched.premise && errors.premise && <h6>{errors.premise}</h6>}
                    </div>
                    <button className="button secondary">Submit</button>
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
        const { projectStart, projectEnd } = project
        return {
            ownerId: user.payload.id,
            parentFolder: {},
            parentCategory: {},
            projectType: project.projectType,
            title: '',
            studio: '',
            startDate: '',
            wrapDate: '',
            location: '',
            budget: 0,
            genres: '',
            premise: '',
            roles: [],
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
    handleSubmit: (values, { setErrors }) => {
        if (Date.parse(values.startDate) >= Date.parse(values.wrapDate)) {
            setErrors({ startDate: 'start date cannot exceed end date' })
            return
        }
        return console.log('return')
    },
})(UserPost)

export default connect(mapStateToProps)(FormikEnhancer)