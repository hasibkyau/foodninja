import React, { Component } from "react";
import { Card, CardBody, CardImg, CardFooter, CardHeader } from "reactstrap";
import MenuApproved from "../MenuApproved/MenuApproved";
import MenuRequest from "../MenuRequest/MenuRequest";
import { fetchDishes } from "../../redux/actionCreators";
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {  
        dishes: state.dishes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDishes: () => dispatch(fetchDishes()),
    }
}

class DashBoard extends Component {
    componentDidMount() {
        this.props.fetchDishes();
    }
    componentDidUpdate(){
        this.props.fetchDishes();
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(DashBoard);