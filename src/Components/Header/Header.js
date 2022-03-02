import React, { useState, useEffect, Component } from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse, } from 'reactstrap';
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
    }


    navToggle = () => {
        this.setState({
            NavOpen: !this.state.NavOpen,
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
                    <form className="form-inline my-2 my-lg-0">
                        <input className="form-control-sm mr-sm-2" type="search" placeholder="Search" aria-label="Search" />
                        <button className="btn btn-outline-success btn-sm my-2 my-sm-0" type="submit">Search</button>
                    </form>
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
                            <Link to="/profile" className="nav-link">{this.props.token == null ? null : MyProfile.fName}</Link>
                        </Collapse>

                    </div>

                </Navbar>
            </div>
        )
    }
}

export default connect(mapStateToProps)(Header);