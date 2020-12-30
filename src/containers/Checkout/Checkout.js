import React, { Component } from 'react';

import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import ContactData from '../ContactData/ContactData';
import { Redirect, Route } from 'react-router-dom';
import { connect } from 'react-redux';


class Checkout extends Component {

    componentWillMount() {

    }

    checkoutCancelledHandler = () => {
        this.props.history.goBack();
    }

    checkoutContinuedHandler = () => {
        console.log("continue purchasing");
        this.props.history.replace('/checkout/contact-data');
    }

    render() {
        let summary = <Redirect to="/" />

        let redirectForPurchasing = this.props.purchased ? <Redirect to="/" /> : null

        if (this.props.ingredients) {
            summary = (
                <CheckoutSummary
                    ingredients={this.props.ingredients}
                    checkoutCancelled={this.checkoutCancelledHandler}
                    checkoutContinued={this.checkoutContinuedHandler} />
            )
        }

        return (
            < div >
                {redirectForPurchasing}
                {summary}
                <Route path={this.props.match.path + "/contact-data"} render={props => <ContactData {...props} />} />
            </div >
        );
    }
}

const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps, null)(Checkout);