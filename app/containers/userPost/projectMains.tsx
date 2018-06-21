import React, { Fragment } from 'react';
import { connect } from 'react-redux';
import { withFormik, FormikProps, Form, Field, } from 'formik';
import * as Yup from 'yup'

import './styles.scss';
import { OtherProps, IValues, postProps } from './projectInterface';
import TextInput from './textInput';

const ProjectMains = (props: OtherProps & FormikProps<IValues>) => {
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
    const { userFolders } = props.user
    return (
        <div className="large-6" style={{ margin: 'auto' }}>
            <Field
                name="parentFolder"
                type="text"
                component="select"
                label="Pick Project's Folder."
            >
                {userFolders && userFolders.map((folder: any) => (
                    <option key={folder._id} value={folder.folderName}>{folder.folderName}</option>)
                )}
            </Field>
            <Field
                name="parentCategory"
                type="text"
                component="select"
                label="Is this Company or Personal?"
            >
                <option value="Company"> Company </option>
                <option value="Personal"> Personal </option>

            </Field>
            <Field
                name="title"
                type="text"
                placeholder="title"
                component={TextInput}
                label="What is this project called?"
            />
            <Field
                name="studio"
                type="text"
                component={TextInput}
                label="Enter Studio or Network"
            />
        </div>
    )
}



const mapStateToProps = ({ project, user }: postProps) => ({ project, user });

const FormikEnhancer = withFormik<postProps, IValues>({
    mapPropsToValues: ({ user, project }: postProps) => {
        const { projectRoles } = project
        return {
            parentFolder: '',
            parentCategory: '',
            title: '',
            studio: '',
        }
    },
    validationSchema: Yup.object().shape({
        parentFolder: Yup.string().required(),
        parentCategory: Yup.string().required(),
        title: Yup.string().required(),
        studio: Yup.string().required()
    }),
    handleSubmit: (values, { setErrors, resetForm, setSubmitting }) => {
        console.log(values)
        resetForm();
        setSubmitting(false)
    },
})(ProjectMains)

export default connect(mapStateToProps)(FormikEnhancer)