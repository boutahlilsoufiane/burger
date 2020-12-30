import React, { Component } from 'react'
import styles from './Auth.css'
import Form from './../../components/UI/Form/Form';
import { auth } from '../../store/actions/auth'
import { connect } from 'react-redux';
import Button from '../../components/UI/Button/Button';
import Spinner from './../../components/UI/Spinner/Spinner';

class Auth extends Component {

    state = {
        isSignUp: true,
        isFormValid: false,
        form: {
            email: {
                touched: false,
                inputtype: 'text',
                placeholder: "Your email",
                type: "email",
                value: "",
                isValid: false,
                validation: {
                    required: true,
                    regularExpression: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
                }
            },
            password: {
                touched: false,
                inputtype: 'input',
                placeholder: "Password",
                type: "Password",
                value: "",
                isValid: false,
                validation: {
                    required: true,
                    minLength: 8
                }
            }
        }
    }

    loginButtonClickedHandler = (event) => {
        event.preventDefault()
        const { auth } = this.props
        const { form, isSignUp } = this.state
        auth(form.email.value, form.email.value, isSignUp)
    }

    isValid(value, rules) {
        let valid = true
        if (rules.required) valid = valid && (value.trim() !== "")
        if (rules.minLength) valid = valid && (value.length >= rules.minLength)
        if (rules.regularExpression) valid = valid && rules.regularExpression.test(value)
        return valid
    }

    isFormValid(form) {
        let isFormValid = true
        for (let key in form) {
            isFormValid = isFormValid && form[key].isValid
        }
        return isFormValid
    }

    inputChangedHandler = (event, inputIdentifier) => {
        const formUpdated = { ...this.state.form }
        const inputIdentifierUpdated = { ...formUpdated[inputIdentifier] }
        inputIdentifierUpdated.value = event.target.value
        inputIdentifierUpdated.isValid = this.isValid(inputIdentifierUpdated.value, inputIdentifierUpdated.validation)
        inputIdentifierUpdated.touched = true
        formUpdated[inputIdentifier] = inputIdentifierUpdated
        this.setState({
            form: formUpdated,
            isFormValid: this.isFormValid(formUpdated)
        })
    }

    switchButtonClickedHandler = () => {
        this.setState(state => ({ isSignUp: !state.isSignUp }))
    }

    render() {
        const { isSignUp } = this.state
        const { loading, error } = this.props
        let errorMsg = null
        if (error) {
            errorMsg = error
        }
        let form = <Form
            controls={this.state.form}
            formSubmitted={this.loginButtonClickedHandler}
            isFormValid={this.state.isFormValid}
            inputChanged={this.inputChangedHandler}
            buttonName={isSignUp ? 'Signup' : 'Login'}
            errorMsg={errorMsg}
        />

        if (loading) {
            form = <Spinner />
        }

        return (
            <div className={styles.FormContainer}>
                {form}
                <Button btnType="Danger" clicked={this.switchButtonClickedHandler}>Switch to {isSignUp ? 'Sign in' : 'Sign up'}</Button>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        loading: state.auth.loading,
        error: state.auth.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        auth: (login, password, isSignUp) => dispatch(auth(login, password, isSignUp))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth) 
