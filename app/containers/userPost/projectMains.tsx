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
    return (
        <div className="large-6" style={{ margin: 'auto', display: 'flex', height: '100vh', alignItems: 'center' }}>
            <Form>
                <Field
                    name="parentCategory"
                    type="text"
                    component="select"
                    label="Folder Type"
                >
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
                    {userFolders && userFolders.map((folder) => {
                        return folder.category === values.parentCategory &&
                            <option key={folder._id} value={folder.folderName}>{folder.folderName}</option>
                    })}
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
                <Field
                    name='hasCD'
                    render={({ field }: any) => (
                        <div className="switch float-right" >
                            <p className="boolLabel help-text">Does it have Casting Director?</p>
                            <input {...field}
                                type="checkbox"
                                className="switch-input"
                                id={`hasCD`}
                                name={`hasCD`}
                            />
                            <label className="switch-paddle" htmlFor={`hasCD`} >
                                <span className="show-for-sr">hasCD</span>
                            </label>
                        </div>
                    )}
                />
                <button type="submit" className="button secondary">Next</button>
            </Form>
        </div>
    )
}


const FormikEnhancer = withFormik<postProps, IValues>({
    mapPropsToValues: ({ user, project }: postProps) => {
        return {
            parentCategory: 'Company',
            parentFolder: '',
            title: '',
            studio: '',
            hasCD: false,
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
    },
})(ProjectMains)

export default (FormikEnhancer)