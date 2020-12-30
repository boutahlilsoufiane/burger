import axios from '../../axios-orders'
import * as actionTypes from '../actions/actionTypes'

const purchaseOrderStart = () => {
    return {
        type: actionTypes.PURCHASE_ORDER_START,
    }
}

const purchaseOrderSuccess = (id, orderData) => {
    return {
        type: actionTypes.PURCHASE_ORDER_SUCCESS,
        id,
        orderData
    }
}

const purchaseOrderFail = (error) => {
    return {
        type: actionTypes.PURCHASE_ORDER_FAIL,
        error: error
    }
}

export const initializePurchaseOrder = () => {
    return {
        type: actionTypes.INIT_PURCHASE_ORDER
    }
}

export const purchaseOrder = (order) => {
    return (dispatch) => {
        dispatch(purchaseOrderStart())
        axios.post('/orders.json', order)
            .then(response => {
                dispatch(purchaseOrderSuccess(response.data.name, order))
            })
            .catch(error => {
                dispatch(purchaseOrderFail(error))
            });
    }
}

export const fetchOrdersSuccess = (orders) => {
    return {
        type: actionTypes.FETCH_ORDERS_SUCCESS,
        orders: orders
    };
};

export const fetchOrdersFail = (error) => {
    return {
        type: actionTypes.FETCH_ORDERS_FAIL,
        error: error
    };
};

export const fetchOrdersStart = () => {
    return {
        type: actionTypes.FETCH_ORDERS_START
    };
};

export const fetchOrders = () => {
    return dispatch => {
        dispatch(fetchOrdersStart());
        axios.get('/orders.json')
            .then(res => {
                const fetchedOrders = [];
                for (let key in res.data) {
                    fetchedOrders.push({
                        ...res.data[key],
                        id: key
                    });
                }
                dispatch(fetchOrdersSuccess(fetchedOrders));
            })
            .catch(err => {
                dispatch(fetchOrdersFail(err));
            });
    };
};