import React, { Component } from 'react';

import Aux from '../../hoc/_Aux/Aux';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import * as burgerBuildActions from '../../store/actions/burgerBuilder'
import * as orderActions from '../../store/actions/order'
import { connect } from 'react-redux';


class BurgerBuilder extends Component {

    state = {
        purchasing: false,
    }

    componentDidMount() {
        this.props.initIngredients()
    }

    updatePurchaseState(ingredients) {
        const sum = Object.keys(ingredients)
            .map(igKey => {
                return ingredients[igKey];
            })
            .reduce((sum, el) => {
                return sum + el;
            }, 0);
        return sum > 0;
    }

    purchaseHandler = () => {
        this.setState({ purchasing: true });
    }

    purchaseCancelHandler = () => {
        this.setState({ purchasing: false });
    }

    purchaseContinueHandler = () => {
        this.props.initializePurchaseOrder()
        this.props.history.push({
            pathname: '/checkout',
        });
    }

    render() {

        const disabledInfo = {
            ...this.props.ingredients
        };
        for (let key in disabledInfo) {
            disabledInfo[key] = disabledInfo[key] <= 0
        }
        let orderSummary = null;
        let burger = this.props.error ? <p>Ingredients can't be loaded!</p> : <Spinner />;

        if (this.props.ingredients) {
            burger = (
                <Aux>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        ingredientAdded={this.props.addIngredient}
                        ingredientRemoved={this.props.removeIngredient}
                        disabled={disabledInfo}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        ordered={this.purchaseHandler}
                        price={this.props.totalPrice} />
                </Aux>
            );
            orderSummary = <OrderSummary
                ingredients={this.props.ingredients}
                price={this.props.totalPrice}
                purchaseCancelled={this.purchaseCancelHandler}
                purchaseContinued={this.purchaseContinueHandler} />;
        }

        return (
            <Aux>
                <Modal show={this.state.purchasing} modalClosed={this.purchaseCancelHandler}>
                    {orderSummary}
                </Modal>
                {burger}
            </Aux>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        error: state.burgerBuilder.error,
        loading: state.burgerBuilder.loading,
        totalPrice: state.burgerBuilder.totalPrice
    }
}

const mapActionsToProps = (dispatch) => {
    return {
        initIngredients: () => dispatch(burgerBuildActions.initIngredients()),
        addIngredient: (ingredientName) => dispatch(burgerBuildActions.addIngredient(ingredientName)),
        removeIngredient: (ingredientName) => dispatch(burgerBuildActions.removeIngredient(ingredientName)),
        initializePurchaseOrder: () => dispatch(orderActions.initializePurchaseOrder())
    }
}

export default connect(mapStateToProps, mapActionsToProps)(withErrorHandler(BurgerBuilder, axios));