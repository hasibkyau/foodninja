import axios from 'axios';
import * as actionTypes from './actionTypes';

export const addIngredient = igtype => {
    return {
        type: actionTypes.ADD_INGREDIENT,
        payload: igtype,
    }
}

export const removeIngredient = igtype => {
    return {
        type: actionTypes.REMOVE_INGREDIENT,
        payload: igtype,
    }
}

export const updatePurchasable = () => {
    return {
        type: actionTypes.UPDATE_PURCHASABLE,
    }
}

export const resetIngredients = () => {
    return {
        type: actionTypes.RESET_INGREDIENTS,
    }
}


export const loadOrders = orders => {
    return {
        type: actionTypes.LOAD_ORDERS,
        payload: orders,
    }
}

export const orderLoadFailed = () => {
    return {
        type: actionTypes.ORDER_LOAD_FAILED,
    }
}

export const fetchOrders = (token, userId) => dispatch => {
    const queryParams = '&orderBy="userId"&equalTo="'+ userId + '"';
    axios.get('https://burger-builder-723e2-default-rtdb.firebaseio.com/orders.json?auth=' + token + queryParams)
        .then(response => {
            console.log("token:", token);
            dispatch(loadOrders(response.data));
        })
        .catch(err => {
            dispatch(orderLoadFailed());
        })
}