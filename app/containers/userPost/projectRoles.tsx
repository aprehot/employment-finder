import * as React from 'react';
import { FieldArray, Field, Formik, Form, FormikProps } from 'formik'

import TextInput from './textInput';
import 'rc-slider/assets/index.css';
import { IValues } from './projectInterface';
import { RoleForm } from './roleForm';


interface IState {
    rolePressed: boolean,
    allRoles: {}[]
}

export const RoleContext = React.createContext({});
class RoleProvider extends React.Component {
    state = {
        rolePressed: false
    }
    render() {
        return (
            <RoleContext.Provider value={{
                state: this.state,
                hideRoleForm: () => this.setState({
                    rolePressed: false
                })
            }} >
                {this.props.children}
            </RoleContext.Provider>
        )
    }
}

export default class ProjectRoles extends React.PureComponent<IValues> {
    state: any = {
        // rolePressed: false,
        allRoles: []
    }
    render() {
        return (
            <RoleProvider>
                <div className="grid-x align-center">
                    <h3 className="text-center cell">Add Character</h3>
                    <Formik
                        initialValues={{ roles: [] }}
                        onSubmit={values =>
                            // setTimeout(() => {
                            //     alert(JSON.stringify(values, null, 2));
                            // }, 500)
                            this.setState({ allRoles: [...this.state.allRoles, values] })
                        }
                        render={({ values }) => (
                            <div
                                className="grid-x cell"
                                onClick={() => {
                                    this.setState({ rolePressed: true })
                                }}
                            >
                                <RoleForm
                                    values={values}
                                // rolePressed={this.state.rolePressed}
                                />
                            </div>
                        )}
                    />

                    <ul>
                        {this.state.allRoles.length > 0 && this.state.allRoles.map((role: any, i: number) => (
                            <li className="roleCard">
                                Hi
                            </li>
                        ))}
                    </ul>

                </div>
            </RoleProvider>
        );
    }
}
