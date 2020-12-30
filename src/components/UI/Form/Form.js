import React from 'react'
import Button from './../Button/Button';
import Input from './../Input/Input';
import classes from './Form.css'

const Form = ({
    controls,
    formSubmitted,
    isFormValid,
    inputChanged,
    buttonName,
    errorMsg
}) => {
    let inputs = []
    for (let key in controls) {
        const control = controls[key]
        inputs.push(<Input touched={control.touched} changed={(event) => inputChanged(event, key)} key={key} options={control.options} inputtype={control.inputtype} placeholder={control.placeholder} isValid={control.isValid} type={control.type} />)
    }

    let error = null
    if (errorMsg) {
        error = <p className={classes.Error}>{errorMsg}</p>
    }

    return (
        <div>
            <form onSubmit={formSubmitted}>
                {inputs}
                {error}
                <Button disabled={!isFormValid} btnType="Success">{buttonName}</Button>
            </form>
        </div>
    )
}

export default Form
