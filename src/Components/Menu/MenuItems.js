import React from 'react';
import { Button, CardText, CardSubtitle, Card, CardImg, CardImgOverlay, CardBody, CardTitle } from 'reactstrap';
//import { baseUrl } from '../../redux/baseUrl';

const MenuItem = props => {
    return (
        <div className='col-12 col-sm-6 col-md-4 col-lg-3 col-xl-3'>
            <div>
            
            <Card style={{ margin: "10px", cursor:"pointer" }}  onClick={props.DishSelect}
                    >
             <CardImg
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
            </Card>
            </div>
        </div>
    );
}

export default MenuItem;