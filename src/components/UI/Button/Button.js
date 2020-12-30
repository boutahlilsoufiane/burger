import React from 'react';

import classes from './Button.css';

const Button = (props) => {
    const buttonClasses = [classes.Button, classes[props.btnType]]
    if (props.disabled) buttonClasses.push(classes['Disabled'])
    return (
        <button
            disabled={props.disabled}
            className={buttonClasses.join(' ')}
            onClick={props.clicked}>{props.children}</button>
    )
};

export default Button;