import React from 'react';
import { Button, Card, CardImg } from 'reactstrap';
import axios from 'axios';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        userId: state.userId,
        token: state.token,
    }
}

const Order = props => {
    const handleRemove = () =>{
        console.log(props.userId);
        
        axios.delete("https://foodninja-4c3c8-default-rtdb.firebaseio.com/customer_orders/" + props.userId + "/" + props.order.id +".json?")
        .then(window.alert("removed from cart!"))
    }

    return (
        <div
            className='container'
            style={{
                color: "white",
                border: "1px solid grey",
                boxShadow: "1px 1px #888888",
                borderRadius: "5px",
                padding: "20px",
                marginBottom: "10px",
            }}>
            <div className='row'>
                <div className='col-2'>
                    <CardImg src={props.order.dish.url} />
                
                </div>

                <div className='col-6'>
                    <p style={{fontWeight:"bold"}}>Order Name: {props.order.dish.name}<span style={{color:"tomato"}}>{props.order.dish.confirmed ? " (Packaging)": " (pending)"}</span></p>
                    <p>Description: {props.order.dish.description} BDT</p>
                    
                    <button onClick={handleRemove} style={{}} className='btn mr-2 btn-danger'>Cancel</button>
                    <button onClick={handleRemove} style={{}} className='btn btn-success'>Confirm</button>
                </div>

                <div className='col-2'>
                    <p>price: {props.order.dish.price} BDT</p>
                </div>

                <div className='col-2'>
                    <p>Q: {1} piece</p>
                </div>

            </div>
        </div>
    )
}

export default connect(mapStateToProps)(Order);
