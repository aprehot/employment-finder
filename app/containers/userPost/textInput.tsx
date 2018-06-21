import React from 'react'
import { FieldProps } from 'formik'

const InputFeedback = ({ children }: any) => (
    <span className="formErr cell">{children}</span>
)

const Label = ({ name, error, children, ...props }:
    { name: string; error: string; children: any; }) => {
    return <label className="cell" {...props} >{children}</label>
}

const TextInput: React.SFC<FieldProps> = ({
    field: { name, ...field },
    form: { touched, errors },
    label,
    ...props
}: any) => {
    const error = errors[name]
    const touch = touched[name]
    return (
        <div className={`${props.roleclass} grid-x cell`} >
            <Label name={name} error={error}>
                <h3>{label}</h3>
            </Label>
            <input
                id={name}
                type="text"
                placeholder={name}
                {...field}
                {...props}
            />
            {touch && error && <InputFeedback>{error}</InputFeedback>}
            {props.statement1 && <p className="cell">{props.statement1}</p>}
            {props.statement2 && <p className="cell">{props.statement2}</p>}
        </div>
    )
}

export default TextInput