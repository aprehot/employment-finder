// /* eslint-disable */
import React from 'react';
import {
    withFormik,
    FormikProps,
    Form,
    Field
} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import './styles.scss';
import { handleProjectType, handleStartDate, handleEndDate } from './actions';
import DatePicker from 'react-date-picker';

interface IValues {
    text?: string,
    title?: string,
    startDate?: string,
    number?: number
}
interface OtherProps {
    text?: string;
    dispatch?: (action: any) => void;
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
        handleSubmit
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
                    <h3>What is this project called? </h3>
                    <Field type="text" name="title" placeholder="Enter Title" />
                    <h3>Who is financing this project? </h3>
                    <Field type="text" name="studio" placeholder="Enter Studio or Network" />
                    <div className='postDates'>
                        <h3>What are the shoot dates?</h3>
                        <div className='postDates'>
                            <h4>Start</h4>
                            <DatePicker
                                name="startDate"
                                returnValue="start"
                                minDate={new Date()}
                                onChange={(e) => dispatch(handleStartDate(e))}
                            />
                        </div>
                        <div className='postDates'>
                            <h4>Wrap</h4>
                            <DatePicker
                                name="wrapDate"
                                returnValue="end"
                                minDate={new Date()}
                                onChange={(e) => dispatch(handleEndDate(e))}
                            />
                        </div>
                    </div>
                    <div className="postShoot">
                        <h3>Where is it shooting? </h3>
                        <Field className="shrink" type="text" name="location" placeholder="Enter Location" />
                        <p>type in full city or country{`\n`}</p>
                        <p>Example: Los Angeles, United Kingdom</p>
                    </div>
                    <div className="postShoot">
                        <h3>What is the Production Budget? </h3>
                        <Field className="shrink" type="number" name="budget" placeholder="#" />
                    </div>
                    <div className="postShoot">
                        <h3>What's the story about? </h3>
                        <Field className="shrink" type="text" name="genre" placeholder="Genres" />
                        <p>Example: Action; Comedy{`\n`}</p>
                        <Field
                            name="premise"
                            render={({ field /* _form */ }) => (
                                // <input {...field} placeholder="firstName" />
                                <textarea {...field} className="shrink" placeholder="Premise" />
                            )}
                        />
                    </div>
                    <button className="button secondary">Submit</button>
                </div>
            </Form >
        </div >
    )
}

const mapStateToProps = ({ user, router, project }: postProps) => {
    console.log(project.projectStart)
    return { user, router, project }
}
const FormikEnhancer = withFormik<postProps, IValues>({
    mapPropsToValues: ({ user, project }: postProps) => {
        return {
            ownerId: user.payload.id,
            parentFolder: {},
            parentCategory: {},
            projectType: project.projectType || 'unspecified',
            title: '',
            studio: '',
            startDate: project.projectStart || 'no start date',
            wrapDate: project.projectEnd || 'no wrap date',
            location: '',
            budget: '',
            genres: '',
            premise: ''
        }
    },
    handleSubmit: values => {
        console.log(values)
    },
})(UserPost)

export default connect(mapStateToProps)(FormikEnhancer)