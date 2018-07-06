import React from 'react';

const RadioPriviledge: React.SFC<any> = ({ radioType, currentChecked, ind, form, setChecked }: any) => {
    return (
        <React.Fragment>
            <input
                type="radio"
                checked={radioType === currentChecked}
                onChange={e => {
                    setChecked(e.target.value)
                    form.setFieldValue(`teams.${ind}.priviledge`, e.target.value)
                }}
                value={radioType} id={radioType} />
            <label htmlFor={radioType}>{radioType}</label>
        </React.Fragment>
    );
};

export default RadioPriviledge;