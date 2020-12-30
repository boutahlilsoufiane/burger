import React from 'react';
import classes from './Input.css'

const Input = (props) => {

    let inputElement = null
    switch (props.inputtype) {
        case 'textarea':
            inputElement = <textarea onChange={props.changed} value={props.value} className={classes.InputElement} placeholder={props.placeholder} />
            break;

        case 'select':
            inputElement = <select onChange={props.changed} className={classes.InputElement} value={props.value}>{props.options.map((option, i) => <option key={i} value={option.value}>{option.displayvalue}</option>)} </select>
            break;

        default:
            inputElement = <input onChange={props.changed} value={props.value} className={classes.InputElement} placeholder={props.placeholder} type={props.type} />
    }

    return (
        <div className={classes.Input}>
            <label className={props.Label}>{props.label}</label>
            {inputElement}
            {(!props.isValid && props.touched) ? <div className={classes.Error}>The field is not valid</div> : ''}
        </div>

    );
}

export default Input;