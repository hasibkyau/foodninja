import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import { Navbar, NavbarBrand, Nav, NavItem, NavbarToggler, Collapse, } from 'reactstrap';
import LOGO from '../../assets/Logo';
//useEfect componentDidMount or update er moto kaj kore
import { connect } from 'react-redux';

const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const Header = props => {

    const [NavOpen, setNavOpen] = useState(false);
    // const [MyInfo, setMyInfo] = useState({});

    const navToggle = () =>{
        const toggle = !NavOpen;
        setNavOpen(toggle);

        // setMyInfo({
        //     age: 24,
        //     name: hasib,
        // })
    }

    // useEffect(()=>{
    //     console.log("didMount");
    // })

    // useEffect(()=>{
    //     console.log("will work when my info is updated");
    // },[MyInfo])


    let links = null;
    if (props.token === null) {
        links = (
            <Nav className='mr-auto' navbar>
                <NavItem>
                    <Link to="/login" className="nav-link">Login</Link>
                </NavItem>
            </Nav>
        )
    } else {
        links = (
            <Nav className='mr-auto' navbar>
                <NavItem>
                    <Link to="/" className="nav-link">Home</Link>
                </NavItem>
                <NavItem>
                    <Link to="/burgerBuilder" className="nav-link">Burger Builder</Link>
                </NavItem>
                <NavItem>
                    <Link to="/orders" className="nav-link">Orders</Link>
                </NavItem>
                <NavItem>
                    <Link to="/logout" className="nav-link">Logout</Link>
                </NavItem>
                <NavItem>
                    <Link to="/upload" className="nav-link">Upload Files</Link>
                </NavItem>
            </Nav>
        )
    }
    return (
        <div>
            <Navbar light color="light" expand="sm">
                <div className='container'>
                    <NavbarToggler onClick={navToggle} />
                    <NavbarBrand href="/">
                        <LOGO />
                    </NavbarBrand>
                    <Collapse isOpen={NavOpen} navbar>
                            {links}                       
                    </Collapse>

                </div>
            </Navbar>
        </div>
    )
}

export default connect(mapStateToProps)(Header);