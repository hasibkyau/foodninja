import React, { Component } from "react";
import { Formik } from "formik";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { storage } from "../../firebase/firebase";
import axios from "axios";

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
                    email: "",
                    phone: "",
                    address: "",
                    pickupPoint: "",
                    url: "",
                    imgName: "",
                    seller: ""
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
                <div className="d-flex flex-md-row flex-column">


                    <div className="m-2" >
                    <p style={{ fontWeight: "bold" }}>Dish image</p>
                            
                        <input className="form-control" type="file" onChange={this.handleInputFileChange} />
                        <progress className="form-control" value={this.state.progress} max="100" />
                        <br />
                        <Card>
                            <CardBody>
                                <img width={200} height={200} src={this.state.url} />
                            </CardBody>
                        </Card>
                    </div>


                    <div className="col-8">
                        <form onSubmit={handleSubmit}>
                            <p style={{ fontWeight: "bold" }}>Dish info</p>
                            <input
                                name="name"
                                placeholder="Enter Menu Name"
                                className="form-control"
                                value={values.name}
                                onChange={handleChange}
                            />
                            <br />

                            <input
                                name="price"
                                placeholder="Enter Menu Price"
                                className="form-control"
                                value={values.price}
                                onChange={handleChange}
                            />
                            <br />

                            <select
                                name="category"
                                value={values.pickupPoint}
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option value={null}>Select category</option>
                                <option value="meal">Meal</option>
                                <option value="fastfood">Fast Food</option>
                                <option value="cookie">Cookie</option>
                                <option value="cake">Cake</option>
                                <option value="dessert">Dessert</option>
                                <option value="chocolate">Chocolate</option>
                            </select>
                            <br />


                            <textarea
                                name="description"
                                placeholder="Enter Menu Description"
                                className="form-control"
                                value={values.description}
                                onChange={handleChange}
                            />
                            <br />
                            <hr />

                            <p style={{ fontWeight: "bold" }}>Seller Info</p>
                            <input
                                name="seller"
                                placeholder="Enter you Name"
                                className="form-control"
                                value={values.seller}
                                onChange={handleChange}
                            />
                            <br />

                            <input
                                type="number"
                                name="phone"
                                placeholder="Contact number"
                                className="form-control"
                                value={values.phone}
                                onChange={handleChange}
                            />
                            <br />

                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                className="form-control"
                                value={values.email}
                                onChange={handleChange}
                            />
                            <br />

                            <input
                                name="address"
                                placeholder="Current Adress"
                                className="form-control"
                                value={values.address}
                                onChange={handleChange}
                            />
                            <br />

                            <select
                                name="pickupPoint"
                                value={values.pickupPoint}
                                className="form-control"
                                onChange={handleChange}
                            >
                                <option value={null}>Select where to sell</option>
                                <option value="sirajganj">Sirajganj</option>
                                <option value="bogura">Bogura</option>
                                <option value="mymensing">Mymensing</option>
                            </select>

                            <br />
                            <hr />
                            <button type="submit" className="btn btn-success">Submit</button>
                        </form>
                    </div>


                    {/* <div className="col-4">
                        <input className="form-control" type="file" onChange={this.handleInputFileChange} />
                        <progress className="form-control" value={this.state.progress} max="100" />
                        <br />
                        <Card>
                            <CardBody>
                                <img width={200} height={200} src={this.state.url} />
                            </CardBody>
                        </Card>
                    </div> */}

                    {/* </div>

                    </div> */}

                </div>
            )}

        </Formik>

        return (
            <div>
                {form}
            </div>
        );

    }
}

export default AddMenu