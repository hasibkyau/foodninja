import React from 'react';
import { Button, CardText, CardSubtitle, Card, CardImg, CardImgOverlay, CardBody, CardTitle, CardFooter } from 'reactstrap';
//import { baseUrl } from '../../redux/baseUrl';

const MenuItem = props => {
    return (
        <div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'>
            <div>
            
            <Card style={{ margin: "10px", cursor:"pointer", backgroundColor: "black" }}  onClick={props.DishSelect}
                    >
             <CardImg
                    width="100%"
                    alt={props.dish.name}
                    src={props.dish.url}
                    style={{ opacity: "1" }}
                />
                
                    <CardFooter style={{backgroundColor:"#2D333B", color: "white"}}>
                            
                    <span>
                        {props.dish.name}
                    </span>
                    <CardText>
                        Price: {props.dish.price}/-
                    </CardText>
                    </CardFooter>
            </Card>
            </div>
        </div>
    );
}

export default MenuItem;