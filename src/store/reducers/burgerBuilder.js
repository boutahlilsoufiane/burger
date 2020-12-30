import { ADD_INGREDIENT, FETCHING_INGREDIENTS_SUCCESSED, REMOVE_INGREDIENT } from "../actions/actionTypes";
import { START_FETCHING_INGREDIENTS, FETCHING_INGREDIENTS_FAILED } from './../actions/actionTypes';
import updateObject from './../utils/helpers/state.helper';

const initalState = {
    ingredients: null,
    loading: false,
    totalPrice: 4,
    error: null,
}

const INGREDIENT_PRICES = {
    salad: 0.5,
    cheese: 0.4,
    meat: 1.3,
    bacon: 0.7
};

const addIngredient = (state, action) => {
    const updatedIngredient = state.ingredients[action.ingredientName] + 1
    const updatedIngredients = { ...state.ingredients, [action.ingredientName]: updatedIngredient }
    const updatedPrice = state.totalPrice + INGREDIENT_PRICES[action.ingredientName]
    return updateObject(state, { ingredients: updatedIngredients, totalPrice: updatedPrice })
}

const removeIngredient = (state, action) => {
    const updatedIngredient = state.ingredients[action.ingredientName] - 1
    const updatedIngredients = { ...state.ingredients, [action.ingredientName]: updatedIngredient }
    const updatedPrice = state.totalPrice - INGREDIENT_PRICES[action.ingredientName]
    return updateObject(state, { ingredients: updatedIngredients, totalPrice: updatedPrice })
}

const startFetchingIngredients = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchingIngredientsSuccess = (state, action) => {
    return updateObject(state, { loading: false, ingredients: action.ingredients, totalPrice: 4 })
}

const fetchingIngredientsFail = (state, action) => {
    return updateObject(state, { loading: true, error: action.error })
}

const burgerBuilderReducer = (state = initalState, action) => {
    switch (action.type) {

        case ADD_INGREDIENT:
            return addIngredient(state, action)

        case REMOVE_INGREDIENT:
            return removeIngredient(state, action)

        case START_FETCHING_INGREDIENTS:
            return startFetchingIngredients(state, action)

        case FETCHING_INGREDIENTS_SUCCESSED:
            return fetchingIngredientsSuccess(state, action)

        case FETCHING_INGREDIENTS_FAILED:
            return fetchingIngredientsFail(state, action)

        default:
            return state;
    }
}

export default burgerBuilderReducer;