import * as actionTypes from '../actions/actionTypes'
import updateObject from './../utils/helpers/state.helper';

const initialState = {
    orders: [],
    loading: false,
    error: null,
    purchased: false
}

const initPurchaseOrder = (state, action) => {
    return updateObject(state, { purchased: false })
}

const purchaseOrderStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const purchaseOrderSuccess = (state, action) => {
    return updateObject(state, { loading: false, purchased: true, orders: state.orders.concat(action.orderData) })
}

const purchaseOrderFail = (state, action) => {
    return updateObject(state, { loading: false, error: action.error })
}

const fetchOrderStart = (state, action) => {
    return updateObject(state, { loading: true })
}

const fetchOrderSuccess = (state, action) => {
    return updateObject(state, { loading: false, orders: state.orders.concat(action.orders) })
}

export const fetchOrderFail = (state, action) => {
    return updateObject(state, { loading: false })
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.INIT_PURCHASE_ORDER:
            return initPurchaseOrder(state, action)

        case actionTypes.PURCHASE_ORDER_START:
            return purchaseOrderStart(state, action)

        case actionTypes.PURCHASE_ORDER_SUCCESS:
            return purchaseOrderSuccess(state, action)

        case actionTypes.PURCHASE_ORDER_FAIL:
            return purchaseOrderFail(state, action)

        case actionTypes.FETCH_ORDERS_START:
            return fetchOrderStart(state, action)

        case actionTypes.FETCH_ORDERS_SUCCESS:
            return fetchOrderSuccess(state, action)

        case actionTypes.FETCH_ORDERS_FAIL:
            return fetchOrderFail(state, action)

        default: return state
    }
}

export default reducer
