import React, { useState, useEffect, Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';
import LOGO from '../../assets/Logo';
//useEfect componentDidMount or update er moto kaj kore
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
    }
}

class Header extends Component {
    state = {
        NavOpen: false,
        //userProfile: JSON.parse(localStorage.getItem("userProfile")),
        dropdownOpen: false
    }


    navToggle = () => {
        this.setState({
            NavOpen: !this.state.NavOpen,
        })
    }

    toggle() {
        this.setState({
            dropdownOpen: !this.state.dropdownOpen,
        })
    }

    render() {

        console.log("render");
        let links = null;
        let MyProfile = null;

        if (this.props.token === null) {

            links = (
                <Nav className='mr-auto' navbar>
                    <NavItem>
                        <Link to="/login" className="nav-link">Login</Link>
                    </NavItem>
                </Nav>
            )
        } else {
            MyProfile = JSON.parse(localStorage.getItem("MyProfile"));
            links = (
                <Nav className='mr-auto' navbar>

                    <NavItem>
                        <Link to="/" className="nav-link">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/menu" className="nav-link">Menu</Link>
                    </NavItem>
                    {/* <NavItem>
                            <Link to="/burgerBuilder" className="nav-link">Burger Builder</Link>
                        </NavItem>
                        <NavItem>
                            <Link to="/orders" className="nav-link">My Orders</Link>
                        </NavItem> */}
                    {this.props.userId === "YswMnUug7edGO7TlZlJsWpFhKbp2" ? <NavItem>
                        <Link to="/dashboard" className="nav-link">DashBoard</Link>
                    </NavItem> : null}

                    <NavItem>
                        <Link to="/" className="nav-link">About</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/" className="nav-link">Contact</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logout" className="nav-link">Logout</Link>
                    </NavItem>
                </Nav>
            )

            var link = null;


        }

        return (

            <div>

                <Navbar light color="light" expand="lg">
                    <div className='container'>

                        <NavbarBrand href="/">
                            <LOGO />
                        </NavbarBrand>
                        <NavbarToggler onClick={this.navToggle} />

                        <Collapse isOpen={this.state.NavOpen} navbar>
                            {links}
                            <Link style={{ margin: "0px", padding: "0px    " }} to="/profile" className="nav-link">
                                {this.props.token == null ? null : <span style={{ color: "black", fontStyle: "italic" }}>{MyProfile.fName} </span>}
                                {this.props.token == null ? null : <img style={{ border: "1px solid gray", backgroundColor: "" }} className="rounded-circle" src={MyProfile.profilePicture} height={30} width={30} />}
                            </Link>
                        </Collapse>

                    </div>

                </Navbar>


            </div>
        )
    }
}

export default connect(mapStateToProps)(Header);