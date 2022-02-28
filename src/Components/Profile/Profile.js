import React, { Component } from "react";
import { Card, CardBody, CardImg, CardFooter } from "reactstrap";
import defaultImg from '../../assets/images/profile/unknown.jpg'
import { NavLink, Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse, } from 'reactstrap';
import { Link } from "react-router-dom";
import AddMenu from "../AddMenu/AddMenu";
import Menu from "../Menu/Menu";
class Profile extends Component {
    state = {
        setting: false,
        addItem: false,
        myItems: true,
        orders: false,
        myCart: false,
    }

    toggleSetting = () => {
        this.setState({
            setting: true,
            addItem: false,
            myItems: false,
            orders: false,
            myCart: false
        })
    }

    toggleAddItem = () => {
        this.setState({
            setting: false,
            addItem: true,
            myItems: false,
            orders: false,
            myCart: false
        })
    }

    toggleMyItem = () => {
        this.setState({
            setting: false,
            addItem: false,
            myItems: true,
            orders: false,
            myCart: false
        })
    }

    toggleOrders = () => {
        this.setState({
            setting: false,
            addItem: false,
            myItems: false,
            orders: true,
            myCart: false
        })
    }

    toggleMyCart = () => {
        this.setState({
            setting: false,
            addItem: false,
            myItems: false,
            orders: false,
            myCart: true
        })
    }

    render() {

        const profile = JSON.parse(localStorage.getItem("userProfile"));
        console.log("User:", profile);

        let content = null;

        if (this.state.myItems) {
            content = (<Menu/>);
        } else if(this.state.setting){
            //myCart
        } else if(this.state.addItem){
            content = (<AddMenu/>)
        } else if(this.state.orders){
            //myItems
        } else if(this.state.myCart) {
            //myCart
        }

        return (
            <div style={{ backgroundColor: "#22272E" }}>
            <div className="container" style={{ backgroundColor: "#22272E" }}>

                <div className="row py-2" >

                    <div className="col-3 col-lg-2 mt-3">
                        <CardImg src={defaultImg} />
                    </div>

                    <div  className="col-9 col-lg-10">
                        <h1 style={{ color: "white" }}>{profile.fName} {profile.lName}</h1>
                        <h3 style={{ color: "white" }}>Ninja Chef</h3>
                        <h5 style={{ color: "white" }}>{profile.email}</h5>
                                   
                    </div>

                    {/* Options */}
                    <div style={{ backgroundColor: "#2D333B"}} className="col-12 col-lg-12 my-2">
                    <button onClick={this.toggleSetting} class="btn btn-primary mr-2" to="/profile" role="button">Setting</button>  
                    <button onClick= {this.toggleAddItem} class="btn btn-primary mr-2" to="/addmenu" role="button">Add Item</button>  
                    <button onClick={this.toggleMyItem} class="btn btn-primary mr-2" to="/profile" role="button">My Items</button>  
                    <button onclick={this.toggleOrders} class="btn btn-primary mr-2" to="/profile" role="button">Orders</button>  
                    <button onclick = {this.toggleMyCart} class="btn btn-primary" to="/profile" role="button">MyCart</button>  
       
                    </div>
                   </div>
                
                    {/* BodY */}
                    <div>
                        {content}
                    </div>
            </div>
            </div>

        );

    }

}

export default Profile;