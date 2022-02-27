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
        userProfile: JSON.parse(localStorage.getItem("userProfile")),
    }


    navToggle = () => {
        this.setState({
            NavOpen: !this.state.NavOpen,
        })
    }

    componentDidMount(){
        console.log(this.state.userProfile.fName);
    }

    render(){

    let links = null;
    let dp = null;
    if (this.props.token === null) {
        links = (
            <Nav className='mr-auto' navbar>
                <NavItem>
                    <Link to="/login" className="nav-link">Login</Link>
                </NavItem>
            </Nav>
        )
    } else {
        if (this.props.userId === "YswMnUug7edGO7TlZlJsWpFhKbp2") {
            links = (
                <Nav className='mr-auto' navbar>
                    <NavItem>
                        <Link to="/" className="nav-link">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/menu" className="nav-link">Menu</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/addmenu" className="nav-link">Add Menu</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/burgerBuilder" className="nav-link">Burger Builder</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/orders" className="nav-link">My Orders</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/dashboard" className="nav-link">DashBoard</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logout" className="nav-link">Logout</Link>
                    </NavItem>
                </Nav>
            )
        } else{
            links = ( <Nav className='mr-auto' navbar>
                    <NavItem>
                        <Link to="/" className="nav-link">Home</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/menu" className="nav-link">Menu</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/addmenu" className="nav-link">Add Menu</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/burgerBuilder" className="nav-link">Burger Builder</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/orders" className="nav-link">My Orders</Link>
                    </NavItem>
                    <NavItem>
                        <Link to="/logout" className="nav-link">Logout</Link>
                    </NavItem>
                </Nav>
            )
        }
    }

    return (
        <div>
            <Navbar light color="light" expand="sm">
                <div className='container'>
                    <NavbarToggler onClick={this.navToggle} />
                    <NavbarBrand href="/">
                        <LOGO />
                    </NavbarBrand>
                    <Collapse isOpen={this.state.NavOpen} navbar>
                        {links}
                    </Collapse>
                </div>
                <NavLink to="/profile">
                    {this.props.token === null ? null : <p>{this.state.userProfile.fName}</p>}
                
                </NavLink>
            </Navbar>
        </div>
    )
}
}

export default connect(mapStateToProps)(Header);