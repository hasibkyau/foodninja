import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText, Button } from 'reactstrap';
import LoadComments from './components/LoadComments';
import CommentForm from './components/CommentForm';
import axios from 'axios';
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        userId: state.userId,
        token: state.token,
    }
}


const DishDetail = props => {
   function handleCart(){
        //console.log(props);
        let MyProfile = JSON.parse(localStorage.getItem("MyProfile"));
        
        let order = {
            confirmed : false,
            orderTime: new Date(),
            userId: MyProfile.userId, 
            dish: props.dish,
            customer : MyProfile,
        }

        axios.post("https://foodninja-4c3c8-default-rtdb.firebaseio.com/customer_orders/"+ order.userId +".json?", order)
            .then(response => window.alert("added to cart!"))
           
    }
    return (
        <div>
            <Card style={{ marginTop: "10px" }}>
                <CardImg top src={props.dish.url} />
                <CardBody style={{ textAlign: "left" }}>
                    <CardTitle>{props.dish.name}</CardTitle>
                    <CardText>
                        {props.dish.description}
                    </CardText>
                    <CardText style={{color:"tomato"}}>
                        Price: {props.dish.price}/-
                    </CardText>

                    <Button onClick={handleCart} className='btn-danger'>Add to Cart</Button>
                    
                    <hr />
                    <CardTitle tag="h5">Reviews:</CardTitle>
                    <div style={{ }}>
                        <LoadComments comments={props.dish.comments}></LoadComments>
                    </div>
                    <CardTitle tag="h5">Add Comments:</CardTitle>
                    <CommentForm dishId={props.dish.id} />


                    {/* <LoadComments comments={props.dish.comments} commentIsLoading = {props.commentIsLoading}></LoadComments> */}
                    <hr />
                    {/* <CommentForm dishId={props.dish.id} addComment={props.addComment} /> */}

                </CardBody>
            </Card>
        </div>
    );
}

export default connect(mapStateToProps)(DishDetail);