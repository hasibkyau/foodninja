import React, { Component } from "react";
import { Card, CardBody, CardImg, CardFooter, CardImgOverlay } from "reactstrap";
import defaultImg from '../../assets/images/profile/unknown.jpg'
import { NavLink, Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse, } from 'reactstrap';
import { Link } from "react-router-dom";
import AddMenu from "../AddMenu/AddMenu";
import Menu from "../Menu/Menu";
import MyItems from "./components/MyItems/MyItems";
import { faHome } from "@fortawesome/free-solid-svg-icons";
import EditProfile from "./components/Setting/EditProfile";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Home from "../Home/Home";


class Profile extends Component {
    state = {
        image: null,
        url: "",
        progress: 0,

        editProfile: false,
        setting: false,
        addItem: false,
        myItems: true,
        orders: false,
        myCart: false,
    }

    toggleSetting = () => {
        this.setState({
            editProfile: false,
            setting: true,
            addItem: false,
            myItems: false,
            orders: false,
            myCart: false
        })
    }

    toggleAddItem = () => {
        this.setState({
            editProfile: false,
            setting: false,
            addItem: true,
            myItems: false,
            orders: false,
            myCart: false
        })
    }

    toggleMyItem = () => {
        this.setState({
            editProfile: false,
            setting: false,
            addItem: false,
            myItems: true,
            orders: false,
            myCart: false
        })
    }

    toggleOrders = () => {
        this.setState({
            editProfile: false,
            setting: false,
            addItem: false,
            myItems: false,
            orders: true,
            myCart: false
        })
    }

    toggleMyCart = () => {
        this.setState({
            editProfile: false,
            setting: false,
            addItem: false,
            myItems: false,
            orders: false,
            myCart: true
        })
    }

    toggleEditProfile = () => {
        this.setState({
            editProfile: true,
            setting: false,
            addItem: false,
            myItems: false,
            orders: false,
            myCart: false,
        })
    }

    render() {

        const profile = JSON.parse(localStorage.getItem("userProfile"));
        console.log("User:", profile);

        let content = null;

        if (this.state.myItems) {
            content = (<MyItems />);
        } else if (this.state.setting) {
            //myCart
        } else if (this.state.addItem) {
            content = (<AddMenu />)
        } else if (this.state.orders) {
            //myItems
        } else if (this.state.myCart) {
            //myCart
        } else if (this.state.editProfile) {
            //Edit profile
            content = (<EditProfile />);
        }

        return (
            <div style={{ backgroundColor: "#22272E" }}>

                <div className="container" style={{ backgroundColor: "#22272E" }}>

                    <div className="row py-2" >
                        <div className="col-3 col-lg-2 mt-3">
                            <CardImg className="rounded-circle" src={defaultImg} />
                            <CardImgOverlay>
                            </CardImgOverlay>
                        </div>

                        <div className="col-9 col-lg-10 my-auto">
                            <h1 style={{ color: "tomato" }}>{profile.fName} {profile.lName}</h1>
                            <h3 style={{ color: "#ADBAC7" }}>Ninja Chef</h3>
                            <h5 style={{ color: "#ADBAC7" }}>{profile.email}</h5>

                            <button onClick={this.handleImgSelect} className="btn btn-danger btn-sm">Change Photo</button>
                            
                        </div>

                        {/* Options */}
                        <div style={{ backgroundColor: "#2D333B" }} className="col-12 col-lg-12 my-2">
                            <button onClick={this.toggleEditProfile} className="btn btn-dark mx-2">Edit Profile</button>

                            <button onClick={this.toggleSetting} className="btn btn-dark mr-2">Setting</button>
                            <button onClick={this.toggleAddItem} className="btn btn-dark mr-2">Add Item</button>
                            <button onClick={this.toggleMyItem} className="btn btn-dark mr-2">My Items</button>
                            <button onClick={this.toggleOrders} className="btn btn-dark mr-2">Orders</button>
                            <button onClick={this.toggleMyCart} className="btn btn-dark">MyCart</button>

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