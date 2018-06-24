import * as React from 'react';
// import { connect } from 'react-redux';
import { withFormik, FormikProps, Form, Field, } from 'formik';
import * as Yup from 'yup'

import './styles.scss';
import TextInput from './textInput';
import { IProps } from '../Login/LoginForm';
import { OtherProps, IValues, postProps } from './projectInterface';

const ProjectMains = (props: OtherProps & FormikProps<IValues>) => {
    const {
        values,
        // dispatch,
        handleSubmit,
        errors,
        project,
        touched,
        isSubmitting
    } = props;
    const validate = (name: string) => {
        const error: any = errors[name]
        const touch: any = touched[name]
        return touch && error && <h6 style={{ color: 'red', fontWeight: 'bold' }}>{error}</h6>
    }
    const { userFolders }: IProps['user'] = props
    // console.log(errors)
    return (
        <div className="large-6" style={{ margin: 'auto' }}>
            <Form>
                <Field
                    name="parentCategory"
                    type="text"
                    component="select"
                    label="Folder Type"
                >
                    <option disabled value=''>Company or Personal?</option>
                    <option value="Company"> Company </option>
                    <option value="Personal"> Personal </option>

                </Field>
                {validate('parentCategory')}
                <Field
                    name="parentFolder"
                    type="text"
                    component="select"
                    label="Folder Name"
                >
                    <option disabled value=''>What is the Project's Folder?</option>
                    {userFolders && userFolders.map((folder) => (
                        <option key={folder._id} value={folder.folderName}>{folder.folderName}</option>)
                    )}
                </Field>
                {validate('parentFolder')}
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
                <button type="submit" className="button secondary">Next</button>
            </Form>
        </div>
    )
}



// const mapStateToProps = ({ project, user }: postProps) => ({ project, user });

const FormikEnhancer = withFormik<postProps, IValues>({
    mapPropsToValues: ({ user, project }: postProps) => {
        // console.log(handleForm)
        // const { projectRoles } = project
        return {
            parentFolder: '',
            parentCategory: '',
            title: '',
            studio: '',
        }
    },
    validationSchema: Yup.object().shape({
        parentCategory: Yup.string().required(),
        parentFolder: Yup.string().required(),
        title: Yup.string().required(),
        studio: Yup.string().required()
    }),
    handleSubmit: (values, { props, setErrors, resetForm, setSubmitting }) => {
        props.handleForm(values, 2)
        // resetForm();
        // setSubmitting(false)
    },
})(ProjectMains)

// export default connect(mapStateToProps)(FormikEnhancer)
export default (FormikEnhancer)