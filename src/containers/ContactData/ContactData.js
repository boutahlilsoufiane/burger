import React, { Component } from "react";
import classes from "./ContactData.css";
import axios from "../../axios-orders";
import Spinner from "../../components/UI/Spinner/Spinner";
import ReactAux from "../../hoc/ReactAux/ReactAux";
import { connect } from "react-redux";
import { purchaseOrder } from "../../store/actions/order";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import Form from "../../components/UI/Form/Form";

class ContactData extends Component {
  state = {
    isFormValid: false,
    orderForm: {
      fullName: {
        touched: false,
        inputtype: "input",
        placeholder: "Full name",
        type: "text",
        value: "",
        isValid: false,
        validation: {
          required: true,
        },
      },
      street: {
        touched: false,
        inputtype: "input",
        placeholder: "Street",
        type: "text",
        value: "",
        isValid: false,
        validation: {
          required: true,
        },
      },
      zipCode: {
        touched: false,
        inputtype: "input",
        placeholder: "Zip code",
        type: "text",
        value: "",
        isValid: false,
        validation: {
          required: true,
          minLength: 5,
        },
      },
      country: {
        touched: false,
        inputtype: "input",
        placeholder: "Country",
        type: "text",
        value: "",
        isValid: false,
        validation: {
          required: true,
        },
      },
      email: {
        touched: false,
        inputtype: "input",
        placeholder: "email",
        type: "email",
        value: "",
        isValid: false,
        validation: {
          required: true,
          regularExpression: /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
        },
      },
      deliveryMethod: {
        touched: false,
        inputtype: "select",
        placeholder: "Delivery method",
        value: "",
        isValid: true,
        options: [
          { value: "fatest", displayvalue: "Fatest" },
          { value: "medium", displayvalue: "Medium" },
        ],
        validation: {},
      },
    },
  };

  continueClickedHandler = (event) => {
    const { token } = this.props;
    event.preventDefault();

    const formData = {};
    for (let inputIdentifier in this.state.orderForm)
      formData[inputIdentifier] = this.state.orderForm[inputIdentifier].value;

    const order = {
      ingredients: this.props.ingredients,
      price: this.props.price,
      formData,
    };

    this.props.purchaseOrder(order, token);
  };

  isValid(value, rules) {
    let valid = true;
    if (rules.required) valid = valid && value.trim() !== "";
    if (rules.minLength) valid = valid && value.length >= rules.minLength;
    if (rules.regularExpression)
      valid = valid && rules.regularExpression.test(value);
    return valid;
  }

  isFormValid(form) {
    let isFormValid = true;
    for (let key in form) {
      isFormValid = isFormValid && form[key].isValid;
    }

    return isFormValid;
  }

  inputChangedHandler = (event, inputIdentifier) => {
    const orderFormUpdated = { ...this.state.orderForm };
    const inputIdentifierUpdated = { ...orderFormUpdated[inputIdentifier] };
    inputIdentifierUpdated.value = event.target.value;
    inputIdentifierUpdated.isValid = this.isValid(
      inputIdentifierUpdated.value,
      inputIdentifierUpdated.validation
    );
    inputIdentifierUpdated.touched = true;
    orderFormUpdated[inputIdentifier] = inputIdentifierUpdated;
    this.setState({
      orderForm: orderFormUpdated,
      isFormValid: this.isFormValid(orderFormUpdated),
    });
  };

  render() {
    let contactData = <Spinner />;
    if (!this.props.loading) {
      contactData = (
        <ReactAux>
          <h2>Enter your contact data</h2>
          <Form
            controls={this.state.orderForm}
            formSubmitted={this.continueClickedHandler}
            isFormValid={this.isFormValid}
            inputChanged={this.inputChangedHandler}
            buttonName={"Order"}
          />
        </ReactAux>
      );
    }
    return <div className={classes.ContactData}>{contactData}</div>;
  }
}

const mapStateToProps = (state) => {
  return {
    ingredients: state.burgerBuilder.ingredients,
    price: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    error: state.order.error,
    token: state.auth.token,
  };
};

const mapDispatchsToProps = (dispatch) => {
  return {
    purchaseOrder: (order, token) => dispatch(purchaseOrder(order, token)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchsToProps
)(withErrorHandler(ContactData, axios));
