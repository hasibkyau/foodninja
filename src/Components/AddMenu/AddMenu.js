import React, { Component } from "react";
import { Formik } from "formik";


class AddMenu extends Component {

    render() {
        let form = null;
        form = <Formik
            initialValues={
                {
                    //id: "",
                    category: "",
                    description: "",
                    featured: true,
                    image: "",
                    label: "",
                    name: "",
                    price: "",
                }
            }

            onSubmit={
                (values) => {
                    console.log(values);
                }
            }
        >
            {({ values, handleChange, handleSubmit }) => (
                <div>
                    <form onSubmit={handleSubmit}>
                    <input
                            name="name"
                            placeholder="Enter Menu Name"
                            className="form-control"
                            value={values.name}
                            onChange={handleChange}
                        />
                        <input
                            name="price"
                            placeholder="Enter Menu Price"
                            className="form-control"
                            value={values.price}
                            onChange={handleChange}
                        />
                        <input
                            name="description"
                            placeholder="Enter Menu Description"
                            className="form-control"
                            value={values.description}
                            onChange={handleChange}
                        />
                        <button type="submit" className="btn btn-success">Submit</button>
                    </form>
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