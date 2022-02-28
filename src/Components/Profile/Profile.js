import React, { Component } from "react";
import { Card, CardBody, CardImg, CardFooter } from "reactstrap";
import defaultImg from '../../assets/images/profile/unknown.jpg'
import { NavLink, Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse, } from 'reactstrap';

class Profile extends Component {

    render() {

        const profile = JSON.parse(localStorage.getItem("userProfile"));
        console.log("User:", profile);

        return (

            <div className="container">

                <div style={{ backgroundColor: "#2D333B" }}>
                    <button> hi </button>
                </div>

                <div className="row" >

                    <div style={{ backgroundColor: "#22272E" }} className="col-3 col-md-2">
                        <CardImg src={defaultImg} />
                    </div>

                    <div style={{ backgroundColor: "#22272E" }} className="col-9 col-lg-10">
                        <h1 style={{ color: "white" }}>{profile.fName} {profile.lName}</h1>
                        <h3 style={{ color: "white" }}>{profile.email}</h3>
                    </div>

                    <div style={{ backgroundColor: "#2D333B" }} className="col-12 col-lg-12">

                        <Navbar color="dark" dark expand="md">
                            <NavbarBrand>{profile.fName}</NavbarBrand>
                            <NavbarToggler onClick={this.toggle} />

                            <Nav className="ml-auto" navbar>
                                <NavItem>
                                    <NavLink href="/components/">Components</NavLink>
                                </NavItem>
                                <NavItem>
                                    <NavLink href="https://github.com/reactstrap/reactstrap">GitHub</NavLink>
                                </NavItem>
                            </Nav>
                        </Navbar>

                    </div>


                </div>

            </div>

        );

    }

}

export default Profile;