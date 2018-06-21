import * as React from 'react';
import { FieldArray, Field, Formik, Form } from 'formik'
import { IValues } from './projectInterface';

export default class ProjectRoles extends React.PureComponent<IValues> {
    render() {
        return (
            <div>
                <h1 className="text-center">Add New Roles</h1>
                <Formik
                    initialValues={{ roles: [] }}
                    onSubmit={values =>
                        setTimeout(() => {
                            alert(JSON.stringify(values, null, 2));
                        }, 500)
                    }
                    render={({ values }) => (
                        <FieldArray
                            name="roles"
                            render={arrayHelpers => (
                                <Form
                                    className="grid-x large-5 ">
                                    <button
                                        type="button"
                                        className="hollow button secondary roleBtns"
                                        onClick={() => arrayHelpers.push(values.roles[0])}
                                    // insert an empty string at a position
                                    >
                                        <span style={{ fontSize: '30px' }}> &#43;  </span>
                                        <span> Add a new Role</span>
                                    </button>
                                    {values.roles && values.roles.length > 0 && (
                                        values.roles.map((role, index) => (
                                            <div key={`${role}.${index}`} className="grid-x cell">
                                                <select name={`roles.${index}["roleType"]`} className="cell">
                                                    <option value='select'>Select Role Type</option>
                                                    <option value="Lead">Lead</option>
                                                    <option value="Strong">Strong</option>
                                                    <option value="Supporting">Supporting</option>
                                                    <option value="Small">Small</option>
                                                    <option value="Cameo">Cameo</option>
                                                </select>
                                                <button
                                                    type="button"
                                                    className="hollow button secondary roleBtns cell"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                // remove a role from the list
                                                >
                                                    <span style={{ fontSize: '30px' }}>&#45;</span>
                                                    <span> Remove Role</span>
                                                </button>
                                            </div>
                                        ))
                                    )}
                                    <div>
                                        <button className="button secondary">Next</button>
                                    </div>
                                </Form>
                            )}
                        />
                    )}
                />
            </div>
        );
    }
}
