import React, { Component } from "react";
import { Formik } from "formik";
import { Card, CardImg, CardBody, Button } from "reactstrap";
import { storage } from "../../firebase/firebase";

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
        }
    };

    handleUpload = () => {
        const uploadTask = storage.ref(`images/Menu/${this.state.image.name}`).put(this.state.image);
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
                    .child(this.state.image.name)
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
                    seller:""
                }
            }

            onSubmit={
                (values) => {
                    values.url = this.state.url,
                    imgName = this.state.imgName,
                    console.log(values);
                }
            }
        >
            {({ values, handleChange, handleSubmit }) => (
                <div className="container">
                    <div className="row">
                        <div className="col-8">
                            <form onSubmit={handleSubmit}>
                                <p style={{fontWeight:"bold"}}>Dish info</p>
                            <input
                                    name="name"
                                    placeholder="Enter Menu Name"
                                    className="form-control"
                                    value={values.name}
                                    onChange={handleChange}
                                />
                                <br/>

                                <input
                                    name="price"
                                    placeholder="Enter Menu Price"
                                    className="form-control"
                                    value={values.price}
                                    onChange={handleChange}
                                />
                                <br/>

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
                                <br/>


                                <textarea
                                    name="description"
                                    placeholder="Enter Menu Description"
                                    className="form-control"
                                    value={values.description}
                                    onChange={handleChange}
                                />
                                <br/>
                                <hr/>
                                
                                <p style={{fontWeight:"bold"}}>Seller Info</p>
                                 <input
                                    name="seller"
                                    placeholder="Enter you Name"
                                    className="form-control"
                                    value={values.seller}
                                    onChange={handleChange}
                                />
                                <br/>

                                <input
                                    type="number"
                                    name="phone"
                                    placeholder="Contact number"
                                    className="form-control"
                                    value={values.phone}
                                    onChange={handleChange}
                                />
                                <br/>    

                                <input
                                    type="email"
                                    name="email"
                                    placeholder="Email"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <br/>

                                <input                
                                    name="address"
                                    placeholder="Current Adress"
                                    className="form-control"
                                    value={values.email}
                                    onChange={handleChange}
                                />
                                <br/>

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

                                <br/>
                                <hr/>
                                <button type="submit" className="btn btn-success">Submit</button>
                            </form>
                        </div>
                        <div className="col-4">
                            <input className="form-control" type="file" onChange={this.handleInputFileChange} />
                            <progress className="form-control" value={this.state.progress} max="100" />
                            <br />
                            <img src={this.state.url} />
                            <Card>
                                <CardBody>
                                    <img width={200} height={200} src={this.state.MyUrl} />
                                </CardBody>
                            </Card>
                        </div>
                    </div>
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