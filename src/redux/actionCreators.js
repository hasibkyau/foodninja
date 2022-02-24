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
    axios.get('https://foodninja-4c3c8-default-rtdb.firebaseio.com/orders.json?auth=' + token + queryParams)
        .then(response => {
            console.log("token:", token);
            dispatch(loadOrders(response.data));
        })
        .catch(err => {
            dispatch(orderLoadFailed());
        })
}








const loadDishes = dishes => ({
    type: actionTypes.LOAD_DISHES,
    payload: dishes,
})

export const fetchDishes = () => dispatch => {
    axios.get("https://foodninja-4c3c8-default-rtdb.firebaseio.com/MENU_ITEMS/.json")
    //.then(response => dispatch(loadDishes(response.data)))
    // .then(dishes => dispatch(loadDishes(dishes)))
    // .catch(error => console.log(error))
    .then(response => {
        //let DISHES : JSON.parse()
        console.log(response.data);
        localStorage.setItem("DISHES", JSON.stringify(response.data.dishes));
        localStorage.setItem("COMMENTS", JSON.stringify(response.data.comments));
        localStorage.setItem("FEEDBACK", JSON.stringify(response.data.feedback));
    })
    
}



