import React, { Component } from 'react';
import { Formik } from 'formik';
import { Alert } from 'reactstrap';
import { connect } from 'react-redux';
import { auth } from '../../redux/authActionCreators';

import Spinner from '../Spinner/Spinner'

const mapDispatchToProps = dispatch => {
    return {
        auth: (email, password, mode, fName, lName) => dispatch(auth(email, password, mode, fName, lName))
    }
}

const mapStateToProps = state =>{
    return{
        authLoading: state.authLoading,
        authFailedMsg: state.authFailedMsg,
    }
}

class Auth extends Component {
    state = {
        mode: "Login",
        account: "Create New Account"
    }

    switchModeHandler = () => {
        this.setState({ mode: this.state.mode === "Sign Up" ? "Login" : "Sign Up" })
    }

    render() {
        let err = null;
        if (this.props.authFailedMsg != null) {
            err = <Alert color='danger'>{this.props.authFailedMsg}</Alert>
        }
        let form = null;
        if(this.props.authLoading){
            form = <Spinner/>
        } else{
            form = <Formik
            initialValues={
                {
                    fName:"",
                    lName:"",
                    email: "",
                    password: "",
                    passwordConfirm: "",
                }
            }

            onSubmit={
                (values) => {
                    this.props.auth(values.email, values.password, this.state.mode, values.fName, values.lName);
                }
            }

            validate={(values) => {
                const errors = {};

                if (!values.email) {
                    errors.email = 'Required';
                } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)) {
                    errors.email = 'Invalid email address';
                }

                if (!values.password) {
                    errors.password = 'Required';
                } else if (values.password.length < 4) {
                    errors.password = 'Must be atleast 6 characters!';
                }

                if (this.state.mode === "Sign Up") {
                    if (!values.passwordConfirm) {
                        errors.passwordConfirm = 'Required';
                    } else if (values.password !== values.passwordConfirm) {
                        errors.passwordConfirm = 'Password field does no match!';
                    }
                }
                //console.log("Errors:", errors)
                return errors;
            }}
        >
            {({ values, handleChange, handleSubmit, errors }) => (
                
                <div className='d-flex flex-md-row flex-column m-5'>
                    
                    <div className='col m-2'>
                        <h1><span style={{color:"tomato"}}>food</span><span>ninja</span></h1>
                        <h2>foodninja helps you sell and buy your favourie food.</h2>
                    </div>

                <div className='col-md-6' style={{
                    border: "1px grey solid",
                    padding: "15px",
                    borderRadius: "7px",
                }}>
                    

                    <form onSubmit={handleSubmit}>

                    {this.state.mode === "Sign Up" ? <div>
                            <input
                                required = "true"
                                name="fName"
                                placeholder="First Name"
                                className="form-control"
                                value={values.fName}
                                onChange={handleChange}
                            />
                             <br />

                            <input
                                required = "true"
                                name="lName"
                                placeholder="Last Name"
                                className="form-control"
                                value={values.lName}
                                onChange={handleChange}
                            />
                            <br />
                            
                        </div> : null}

                        <input
                            required = "true"
                            name="email"
                            placeholder="Enter Your Email"
                            className="form-control"
                            value={values.email}
                            onChange={handleChange}
                        />
                         <br />
                        <input
                            type="password"
                            name="password"
                            placeholder="Password"
                            className="form-control"
                            value={values.password}
                            onChange={handleChange}
                        />
                        <span style={{ fontStyle:"italic", color: "black" }}>{errors.password}</span>
                        <br />
                        
                        

                        {this.state.mode === "Sign Up" ? <div>
                            <input
                                type="password"
                                name="passwordConfirm"
                                placeholder="Confirm Password"
                                className="form-control"
                                value={values.passwordConfirm}
                                onChange={handleChange}
                            />
                            <span style={{ fontStyle:"italic", color: "black" }}>{errors.passwordConfirm}</span>
                            <br />
                            
                        </div> : <p>forgot password?</p>}

                        <button type="submit" style={{width:"100%"}} className="btn btn-success">{this.state.mode === "Sign Up" ? "Sign Up" : "Login"}</button>
                        <p>Create New Account</p>
                        <button style={{
                        width: "100%",
                        backgroundColor: "tomato",
                        color: "white",
                        
                    }} className="btn btn-lg" onClick={this.switchModeHandler}>{this.state.mode === "Sign Up" ? "Allready Have Account?" : "Create New Account"}</button>
                    <br /><br />
                        <hr/>
                        
                    </form>
                </div>
                </div>
                )}
        </Formik>
        }
        return (
            <div>
                {err}
                {form}
            </div>
        )
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(Auth);