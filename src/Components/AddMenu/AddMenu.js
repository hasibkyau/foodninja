import React, { Component } from "react";
import { Formik } from "formik";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { storage } from "../../firebase/firebase";
import axios from "axios";
import AdvertiseSection from "../Home/components/AdvertiseSection";

// import AdvertiseImg from '../../assets/images/foodninja/foodninja-01.png'
import AdvertiseImg from '../../assets/images/foodninja/foodninja-01.png';
import { Redirect } from "react-router-dom/cjs/react-router-dom.min";

class AddMenu extends Component {
    state = {
        image: null,
        url: "",
        progress: 0,
        imgName: "",
    }
    handleInputFileChange = e => {
        if (e.target.files[0]) {
            this.setState({
                image: e.target.files[0],
                imgName: e.target.files[0].name
            })
            this.handleUpload(e.target.files[0]);
        }
    };

    handleUpload = (image) => {
        const uploadTask = storage.ref(`images/Menu/${image.name}`).put(image);
        uploadTask.on(
            "state_changed",
            snapshot => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                this.setState({
                    progress: progress,
                })
            },
            error => {
                console.log(error);
            },
            () => {
                storage
                    .ref("images/Menu")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url => {
                        this.setState({
                            url: url,
                        })
                    });
            }
        );
    }


    render() {
        const userInfo = JSON.parse(localStorage.getItem("MyProfile"));
        let form = null;
        form = <Formik
            initialValues={
                {
                    //id: "",
                    category: "",
                    description: "",
                    featured: true,
                    label: "",
                    name: "",
                    price: "",
                    category: "",
                    label: "",

                    url: "",
                    imgName: "",
                    sellerfName: userInfo.fName,
                    sellerlName: userInfo.lName,
                    sellerId: userInfo.userId,
                    email: userInfo.email,
                    phone: "",
                    SellerAddress: "",
                    pickupPoint: "",

                }
            }

            onSubmit={
                (values) => {
                    values.url = this.state.url,
                        values.imgName = this.state.imgName,
                        axios.post('https://foodninja-4c3c8-default-rtdb.firebaseio.com/dishes.json', values)
                    console.log("axios post", values);
                }

            }
        >
            {({ values, handleChange, handleSubmit }) => (
                <div className="">


                    <div className="m-2 " >



                    </div>


                    <div className="p-3" style={{ backgroundColor: "#2D333B", margin: "15px", border: "", borderRadius: '10px' }}>
                        <form onSubmit={handleSubmit}>
                            <p style={{ fontWeight: "bold" }}>Dish info</p>

                            <div className="row">
                                <div className="col-12 col-md-6">
                                   
                                    <img style={{ border: "1px solid black" }} className="m-auto" width={150} height={150} src={this.state.url} />

                                    <input style={{ backgroundColor: "#2D333B", width: "150px" }} className="form-control" type="file" onChange={this.handleInputFileChange} />
                                    <progress style={{ backgroundColor: "#2D333B", width: "150px" }} className="form-control" value={this.state.progress} max="100" />
                                    <br />
                                </div>

                                <div className="col-12 col-md-6">
                                    <p style={{ fontWeight: "lighter" }}>Food Name</p>
                                    <input
                                        name="name"
                                        placeholder="Enter Menu Name"
                                        className="form-control"
                                        value={values.name}
                                        onChange={handleChange}
                                        style={{ backgroundColor: "#22272E", color: "white", border: "1px solid black" }}
                                    />
                                    <br />
                                    <p style={{ fontWeight: "lighter" }}>Food Price</p>
                                    <input
                                        name="price"
                                        placeholder="Enter Menu Price"
                                        className="form-control"
                                        value={values.price}
                                        onChange={handleChange}
                                        style={{ backgroundColor: "#22272E", color: "white", border: "1px solid black" }}
                                    />
                                    <br />
                                </div>
                            </div>


                            {/* <div className="row">
                                <div className="col-12 col-md-6"></div>
                                <div className="col-12 col-md-6"></div>
                            </div> */}


                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <p style={{ fontWeight: "lighter" }}>Food Category</p>
                                    <select
                                        name="category"
                                        value={values.pickupPoint}
                                        className="form-control"
                                        onChange={handleChange}
                                        style={{ backgroundColor: "#22272E", color: "white", border: "1px solid black" }}
                                    >
                                        <option value={null}>choose...</option>
                                        <option value="meal">Meal</option>
                                        <option value="fastfood">Fast Food</option>
                                        <option value="cookie">Cookie</option>
                                        <option value="cake">Cake</option>
                                        <option value="fruit">Fruit</option>
                                        <option value="dessert">Dessert</option>
                                        <option value="chocolate">Chocolate</option>
                                    </select>
                                    <br />
                                </div>
                                <div className="col-12 col-md-6">
                                    <p style={{ fontWeight: "lighter" }}>Description</p>
                                    <textarea
                                        name="description"
                                        placeholder="Enter Menu Description"
                                        className="form-control"
                                        value={values.description}
                                        onChange={handleChange}
                                        style={{ backgroundColor: "#22272E", color: "white", border: "1px solid black" }}
                                    />
                                    <br />
                                </div>
                            </div>

                            <p style={{ fontWeight: "bold" }}>Seller Info</p>


                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <p style={{ fontWeight: "lighter" }}>Contact Number</p>
                                    <input
                                        type="number"
                                        name="phone"
                                        placeholder="Contact number"
                                        className="form-control"
                                        value={values.phone}
                                        onChange={handleChange}
                                        style={{ backgroundColor: "#22272E", color: "white", border: "1px solid black" }}
                                    />
                                    <br />
                                </div>
                                <div className="col-12 col-md-6">
                                    <p style={{ fontWeight: "lighter" }}>Current Address</p>
                                    <input
                                        name="SellerAddress"
                                        placeholder="Your Adress"
                                        className="form-control"
                                        value={values.SellerAddress}
                                        onChange={handleChange}
                                        style={{ backgroundColor: "#22272E", color: "white", border: "1px solid black" }}
                                    />
                                    <br />
                                </div>
                            </div>

                            <div className="row">
                                <div className="col-12 col-md-6">
                                    <p style={{ fontWeight: "lighter" }}>Sell Zone</p>
                                    <select
                                        name="pickupPoint"
                                        value={values.pickupPoint}
                                        className="form-control"
                                        onChange={handleChange}
                                        style={{ backgroundColor: "#22272E", color: "white", border: "1px solid black" }}
                                    >
                                        <option value={null}>choose...</option>
                                        <option value="sirajganj">Sirajganj</option>
                                        <option value="bogura">Bogura</option>
                                        <option value="mymensing">Mymensing</option>
                                    </select>
                                    <br />

                                </div>
                                <div className="col-12 col-md-6">
                                    <p style={{ fontWeight: "lighter" }}>Payment Method</p>
                                    <select
                                        name="pickupPoint"
                                        value={values.pickupPoint}
                                        className="form-control"
                                        onChange={handleChange}
                                        style={{ backgroundColor: "#22272E", color: "white", border: "1px solid black" }}
                                    >
                                        <option value={null}>choose...</option>
                                        <option value="sirajganj">CashOn Delivery</option>
                                        <option value="bogura">bKash</option>
                                        <option value="mymensing">Both</option>
                                    </select>
                                </div>
                            </div>



                            <br />
                            <hr />
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>




                </div>
            )}

        </Formik>

        return (
            <div style={{ backgroundColor: '#22272E', color: "white" }}>
                <div className="container">

                    {form}
                </div>
            </div>
        );

    }
}

export default AddMenu