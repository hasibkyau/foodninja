import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchOrders } from '../../../../redux/actionCreators';

import Order from './Order/Order';
import { Button, Spinner } from 'reactstrap';
import axios from 'axios';

const mapStateToProps = state => {
    return {
        orders: state.orders,
        orderLoading: state.orderLoading,
        orderErr: state.orderErr,
        token: state.token,
        userId: state.userId,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchOrders: (token, userId) => dispatch(fetchOrders(token, userId)),
    }
}

class Orders extends Component {



    componentDidMount() {
        this.props.fetchOrders(this.props.token, this.props.userId);
        //console.log("orders", this.props.orders);
    }

    render() {
        let orders = null;

        if (this.props.orders.length === 0) {
            orders = <p style={{
                color: "white",
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
                marginBottom: "10px",
            }}>You have no Orders!</p>
        } else {
            orders = this.props.orders.map(order => {
                if (order.customerId == this.props.userId) {
                    return <Order order={order} key={order.id} />
                }
            })
        }


        return (
            <div className='text-white container'>
                {this.props.orderLoading ? <Spinner /> : orders}

            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Orders);