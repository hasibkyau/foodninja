import React from 'react';
import { Button, CardText, CardSubtitle, Card, CardImg, CardImgOverlay, CardBody, CardTitle, CardFooter } from 'reactstrap';
//import { baseUrl } from '../../redux/baseUrl';

const MenuFilter = props => {
    return (
        <div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'>
            <div>
            
            <Card style={{ margin: "10px", cursor:"pointer" }}
                    >
             <CardImg
                    onClick={props.dishDetail}
                    width="100%"
                    alt={props.dish.name}
                    src={props.dish.url}
                    style={{ opacity: "1" }}
                />
                <CardBody style={{ textAlign: "left" }}>

                    <span>
                        {props.dish.name}
                    </span>
                    <CardText>
                        Price: {props.dish.price}/-
                    </CardText>
                    </CardBody>
                    <div>
                    <button onClick={props.dishDetail} style={{}} className='btn btn-danger m-1'>Remove</button>
                    <button onClick={props.DishApprove} className='btn btn-success'>Approve</button>
                    
                    </div>
                    
            </Card>
            </div>
        </div>
    );
}

export default MenuFilter;