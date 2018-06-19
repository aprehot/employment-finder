// /* eslint-disable */
import React from 'react';
import {
    withFormik,
    FormikProps,
    Form,
    // Field
} from 'formik';
import * as Yup from 'yup';
import { connect } from 'react-redux';
import './styles.scss';
import { handleProjectType } from './actions';
import { IProps } from '../Login/LoginForm';


interface IValues {
    text?: string,
    title?: string
}
interface OtherProps {
    text?: string,
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
        dispatch
    } = props
    return (
        <div className="grid-container">
            <h1>New Project</h1>
            <Form>
                <h3>What kind of project is it?</h3>
                <input type="text" name="title" placeholder="Enter Title" value={values.text} onChange={handleChange} />
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
        console.log(project)
        return {
            ownerId: user.payload.id,
            title: '',
            projectType: project.projectType
        }
    },
    handleSubmit: values => {
        console.log(values)
    },
})(UserPost)

export default connect(mapStateToProps)(FormikEnhancer)