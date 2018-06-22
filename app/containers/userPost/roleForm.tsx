// const Slider = require('rc-slider');
// import React from 'react';
// import { FieldArray, Form, FormikProps, Field } from 'formik'
// import TextInput from './textInput';

// import { RoleContext } from './projectRoles';


// const createSliderWithTooltip = Slider.createSliderWithTooltip;
// const Range = createSliderWithTooltip(Slider.Range);


// export const RoleForm = (props: any) => {
//     const {
//         values,
//     } = props;
//     return (
//         <FieldArray
//             name="roles"
//             render={arrayHelpers => (
//                 <Form className="grid-x large-5 align-center">
//                     <RoleContext.Consumer>
//                         {(context: any) => (
//                             !context.state.rolePressed ?
//                                 <button
//                                     type="button"
//                                     className="hollow button secondary roleBtns"
//                                     onClick={() => {
//                                         // context.hideRoleForm
//                                         arrayHelpers.push({
//                                             roleType: '',
//                                             name: '',
//                                             gender: '',
//                                             ages: [],
//                                             specifics: '',
//                                             description: '',
//                                             isSag: false,
//                                             isOpen: false,
//                                             isLocal: false,
//                                             isOnOffer: false
//                                         })
//                                     }}
//                                 >
//                                     <span style={{ fontSize: '30px' }}> &#43;  </span>
//                                     <span> Add a new Role</span>
//                                 </button>
//                                 :
//                                 context.state.rolePressed &&
//                                 values.roles.map((role: any, index: number) => (
//                                     <div key={`${role}.${index}`} className="grid-x cell">
//                                         <Field component="select" name={`roles.${index}.roleType`} className="cell">
//                                             <option disabled value="">Choose Role Type</option>
//                                             {/* TODO: add YUP validation to not trigger submit on this value */}
//                                             <option value="Lead">Lead</option>
//                                             <option value="Strong">Strong</option>
//                                             <option value="Supporting">Supporting</option>
//                                             <option value="Small">Small</option>
//                                             <option value="Cameo">Cameo</option>
//                                         </Field>
//                                         <Field
//                                             name={`roles.${index}.name`}
//                                             type="text"
//                                             placeholder="Character Name"
//                                             component={TextInput}
//                                         />
//                                         <Field
//                                             name={`roles.${index}.ages`}
//                                             render={(fieldProps: any) => (
//                                                 <div style={{ width: '400px', margin: '50px' }}>
//                                                     <p>Set Age Range</p>
//                                                     <Range
//                                                         min={5} max={80}
//                                                         defaultValue={[20, 48]}
//                                                         tipFormatter={(value: number) => `${value}`}
//                                                         onChange={(e: any) => fieldProps.form.setFieldValue(`roles.${index}.ages`, e)}
//                                                     />
//                                                 </div>
//                                             )}
//                                         />
//                                         <Field
//                                             name={`roles.${index}.specifics`}
//                                             type="text"
//                                             placeholder="Specifics"
//                                             component={TextInput}
//                                             statement1={"Example: Australian, Asian, Singer"}
//                                         />
//                                         <Field
//                                             name={`roles.${index}.description`}
//                                             render={({ field }: any) => (
//                                                 <textarea {...field} className="" placeholder="Description" />
//                                             )}
//                                         />
//                                         <button
//                                             type="button"
//                                             className="button alert roleBtns"
//                                             onClick={() => {
//                                                 context.hidRoleForm
//                                                 arrayHelpers.remove(index)
//                                             }}
//                                         >Remove Role</button>
//                                         <div className="grid-x cell">
//                                             <button
//                                                 type="submit"
//                                                 className="button secondary cell shrink"
//                                                 onClick={() => {
//                                                     console.log(context)
//                                                     context.showRoleForm
//                                                 }}
//                                             > Next</button>
//                                         </div>
//                                     </div>
//                                 ))
//                         )}
//                     </RoleContext.Consumer>
//                 </Form>
//             )}
//         />
//     )
// }