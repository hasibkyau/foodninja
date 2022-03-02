import React from 'react';
import { Card, CardImg, CardBody, CardTitle, CardText } from 'reactstrap';
import CommentForm from '../../../Menu/components/CommentForm';
import LoadComments from '../../../Menu/components/LoadComments';

const DishDetail = props => {
    return (
        <div>
            <Card style={{ marginTop: "10px" }}>
                <CardImg top src={props.dish.url} />
                <CardBody style={{ textAlign: "left" }}>
                    <CardTitle>{props.dish.name}</CardTitle>
                    <CardText>
                        {props.dish.description}
                    </CardText>
                    <CardText>
                        Price: {props.dish.price}/-
                    </CardText>
                    <hr />
                    <CardTitle tag="h4">Comments:</CardTitle>
                    {/* <LoadComments comments={props.comments} commentIsLoading = {props.commentIsLoading}></LoadComments> */}
                    <hr />
                    {/* <CommentForm dishId={props.dish.id} addComment={props.addComment} /> */}
                    <CommentForm dishId={props.dish.id} />
                </CardBody>
            </Card>
        </div>
    );
}

export default DishDetail;