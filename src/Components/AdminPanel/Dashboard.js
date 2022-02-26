import React, { Component } from "react";
import { Link, NavLink } from "react-router-dom";
import { Card, CardBody, CardImg, CardFooter, CardHeader, CardText } from "reactstrap";
import { CardImgOverlay } from "reactstrap";
import img from '../../assets/images/dashboard/shopping-bag.png'
class DashBoard extends Component {
    render() {
        return (
            <div className="container">
                <div className="row">

                    <div className="col-2">
                        left
                    </div>

                    <div className="col-8">
                        <div className="row">
                            <div className='col-12 col-sm-6'>
                                <Card>
                                    <NavLink to="/menurequest" style={{ textDecoration: "none", color: "tomato", margin: "0px", padding: "0px" }}>
                                        <img height="150px" src={img} />
                                        <CardImgOverlay>Hello</CardImgOverlay>
                                        <CardFooter>
                                            <CardText>
                                                New Item Requests: 10
                                            </CardText>
                                        </CardFooter>
                                    </NavLink>
                                </Card>
                            </div>

                            <div className='col-12 col-sm-6'>
                                <Card>
                                    <NavLink to="/approvedmenu" style={{ textDecoration: "none", color: "tomato", margin: "0px", padding: "0px" }}>
                                        <img height="150px" src={img} />
                                        <CardFooter>
                                            <CardText>
                                                Item Approved: 10
                                            </CardText>
                                        </CardFooter>
                                    </NavLink>
                                </Card>
                            </div>


                            <div className='col-12 col-sm-6'>
                                <Card>
                                    <NavLink to="/approvedmenu" style={{ textDecoration: "none", color: "tomato", margin: "0px", padding: "0px" }}>
                                        <img height="150px" src={img} />
                                        <CardFooter>
                                            <CardText>
                                                New Oreder: 10
                                            </CardText>
                                        </CardFooter>
                                    </NavLink>
                                </Card>
                            </div>
                            <div className='col-12 col-sm-6'>
                                <Card>
                                    <NavLink to="/approvedmenu" style={{ textDecoration: "none", color: "tomato", margin: "0px", padding: "0px" }}>
                                        <img height="150px" src={img} />
                                        <CardFooter>
                                            <CardText>
                                                Order Confirmed: 10
                                            </CardText>
                                        </CardFooter>
                                    </NavLink>
                                </Card>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default DashBoard;