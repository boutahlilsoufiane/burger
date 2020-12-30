import * as actionTypes from "./actionTypes"
import axios from '../../axios-orders';

export const addIngredient = (ingredientName) => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        ingredientName
    }
}

export const removeIngredient = (ingredientName) => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        ingredientName
    }
}

const startFetchingIngredients = () => {
    return {
        type: actionTypes.START_FETCHING_INGREDIENTS
    }
}

const fetchingIngredientsSuccessed = (ingredients) => {
    return {
        type: actionTypes.FETCHING_INGREDIENTS_SUCCESSED,
        ingredients: ingredients
    }
}

const fetchingIngredientsFailed = (error) => {
    return {
        type: actionTypes.FETCHING_INGREDIENTS_FAILED,
        error: error
    }
}

export const initIngredients = () => {
    return (dispatch) => {
        dispatch(startFetchingIngredients())
        axios.get('https://burger-cbaaf.firebaseio.com/ingredients.json')
            .then(response => {
                dispatch(fetchingIngredientsSuccessed(response.data))
            })
            .catch(error => {
                dispatch(fetchingIngredientsFailed(error))
            });
    }
}