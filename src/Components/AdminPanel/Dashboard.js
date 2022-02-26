import React, { Component } from "react";
import { Card, CardBody, CardImg, CardFooter, CardHeader } from "reactstrap";
import MenuApproved from "../MenuApproved/MenuApproved";
import MenuRequest from "../MenuRequest/MenuRequest";
class DashBoard extends Component {
    render(){
        return(
            <div style={{backgroundColor:'tomato'}}>
               <div className="container">
                <h3 style={{backgroundColor:"tomato", color:"white", padding:"10px"}}>New Items</h3>
                <div>
                <MenuRequest/>
                </div>
                <h3 style={{backgroundColor:"tomato", color:"white", padding:"10px"}}>Aprroved Items</h3>
                <MenuApproved/>
                </div> 
            
            </div>
        );
    }
}

export default DashBoard;