import * as React from 'react';
import { FieldArray, Field, Formik, Form } from 'formik'

interface IRoles {
    roleType: string,
    name: string,
    gender: string,
    minAge: number,
    maxAge: number,
    specifics: string,
    description: string,
    isSag: boolean,
    isOpen: boolean,
    isLocal: boolean,
    isOnOffer: boolean
}

class UserRoles extends React.PureComponent<IRoles> {
    render() {
        return (
            <div>
                <h1>Add New Roles</h1>
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
                                <Form>
                                    {values.roles && values.roles.length > 0 ? (
                                        values.roles.map((role, index) => (
                                            <div key={`${role}.${index}`} className="">
                                                <select name={`roles.${index}["roleType"]`}>
                                                    <option value='select'>Select Role Type</option>
                                                    <option value="Lead">Lead</option>
                                                    <option value="Strong">Strong</option>
                                                    <option value="Supporting">Supporting</option>
                                                    <option value="Small">Small</option>
                                                    <option value="Cameo">Cameo</option>
                                                </select>
                                                <button
                                                    type="button"
                                                    className="hollow button secondary roleBtns"
                                                    onClick={() => arrayHelpers.remove(index)}
                                                // remove a role from the list
                                                >
                                                    <span style={{ fontSize: '30px' }}> &#43;  </span>
                                                    <span> Add Role</span>
                                                </button>
                                                <button
                                                    type="button"
                                                    className="hollow button secondary roleBtns"
                                                    onClick={() => arrayHelpers.insert(index, '')}
                                                // insert an empty string at a position
                                                >
                                                    <span style={{ fontSize: '30px' }}>&#45;</span>
                                                    <span> Remove</span>
                                                </button>
                                            </div>
                                        ))
                                    ) : (
                                            <button type="button" onClick={() => arrayHelpers.push('')}>
                                                {/* show this when user has removed all roles from the list */}
                                                Add a friend
                                            </button>
                                        )}
                                    <div>
                                        <button type="button secondary">Submit</button>
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

export default UserRoles;