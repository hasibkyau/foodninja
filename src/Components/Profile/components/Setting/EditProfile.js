import React, { Component } from "react";
import { storage } from "../../../../firebase/firebase";
import { Card, CardImg, CardBody } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";
import { loadOrders } from "../../../../redux/actionCreators";
import { Formik } from "formik";


const mapStateToProps = state => {
  return {

    userId: state.userId,
    token: state.token,
  }
}

class EditProfile extends Component {
  state = {
    id: "",
    image: null,
    url: "",
    progress: 0,
    MyUrl: null,
  }

  handleInputFileChange = e => {
    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0]
      })
    }
    this.handleUpload(e.target.files[0]);
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

  handleImgSave = () => {
    let userInfo = JSON.parse(localStorage.getItem("userProfile"));
    userInfo.dpUrl = this.state.url;
    let updatedInfo = JSON.stringify(userInfo)
    localStorage.setItem("newProfile", updatedInfo);
    console.log(userInfo.Id);
  }

  render() {
    const MyProfile = JSON.parse(localStorage.getItem("MyProfile"));
    const profileUpdateUrl = "https://foodninja-4c3c8-default-rtdb.firebaseio.com/user_profile/" + (MyProfile.id) + ".json";


    let form = null;
    form = <Formik
      initialValues={
        {
          id: MyProfile.id,
          userId: MyProfile.userId,
          fName: MyProfile.fName,
          lName: MyProfile.lName,
          email: MyProfile.email,


          secondaryEmail: MyProfile.secondaryEmail == undefined ? undefined : MyProfile.secondaryEmail,
          phone: MyProfile.phone == undefined ? undefined : MyProfile.phone,
          adress: MyProfile.adress == undefined ? undefined : MyProfile.adress,
          pickupPoint: MyProfile.pickupPoint == undefined ? undefined : MyProfile.pickupPoint,
          bio: MyProfile.bio == undefined ? undefined : MyProfile.bio,
          accountType: MyProfile.accountType == undefined ? undefined : MyProfile.accountType,

        }
      }

      onSubmit={
        (values) => {
          values.profilePicture = this.state.url == "" ? MyProfile.profilePicture : this.state.url,
            axios.put(profileUpdateUrl, values)
              .then(response => {
                window.alert("Profile Updated");
                localStorage.setItem("MyProfile", JSON.stringify(values));
              })
        }

      }
    >
      {({ values, handleChange, handleSubmit }) => (
        <div className="row p-2" style={{ backgroundColor: "#22272E", color: "tomato", borderRadius: '10px', }}>
          <form style={{ width: "100%" }} onSubmit={handleSubmit} >
            <br />

            <p style={{ fontWeight: "bold", }}>Edit Profile Picture</p>

            <div className="p-3" style={{ backgroundColor: "#22272E", borderRadius: "10px", color: "white" }}>
              <div className="row">
                <img style={{ border:'2px solid gray'}} className="ml-4 rounded-circle" width={200} height={200} src={this.state.url == "" ? MyProfile.profilePicture : this.state.url} />
                <input className="form-control mx-3" type="file" onChange={this.handleInputFileChange} style={{ border: "0px", backgroundColor: "#2D333B", color: "white" }} />
                <progress className="form-control mx-3" value={this.state.progress} max="100" style={{ backgroundColor: "#2D333B", border: "0px", marginLeft: "", display:"block" }} />
                
              </div>
            </div>

            <br />
            <p style={{ fontWeight: "bold" }}>Edit Personal Information</p>

            <div className="p-3" style={{ backgroundColor: "#2D333B", borderRadius: "10px" }}>
              
              
              <div className="row">
               
                <div className="col-12 col-md-6">
                  <p style={{ fontWeight: "lighter" }}>First Name</p>
                  <input
                    name="fName"
                    placeholder="First Name"
                    className="form-control"
                    value={values.fName}
                    onChange={handleChange}
                    style={{ backgroundColor: "#2D333B", color: "white" }}
                  />
                  <br />
                </div>

                <div className="col-12 col-md-6">
                  <p style={{ fontWeight: "lighter" }}>Last Name</p>
                  <input
                    name="lName"
                    placeholder="Last Name"
                    className="form-control"
                    value={values.lName}
                    onChange={handleChange}
                    style={{ backgroundColor: "#2D333B", color: "white" }}
                  />
                </div>
              </div>

              <br />

              <div className="row">
                <div className="col-12 col-md-6">
                  <p style={{ fontWeight: "lighter" }}>Secondary Email</p>
                  <input
                    type="email"
                    name="secondaryEmail"
                    placeholder="Secondary Email"
                    className="form-control"
                    value={values.secondaryEmail}
                    onChange={handleChange}
                    style={{ backgroundColor: "#2D333B", color: "white" }}
                  />
                  <br />
                </div>

                <br />

                <div className="col-12 col-md-6">
                  <p style={{ fontWeight: "lighter" }}>Contact Number</p>
                  <input
                    type="number"
                    name="phone"
                    placeholder="Contact number"
                    className="form-control"
                    value={values.phone}
                    onChange={handleChange}
                    style={{ backgroundColor: "#2D333B", color: "white" }}
                  />
                </div>
              </div>

              <br />

              <div className="row">
                <div className="col-12 col-md-6">
                  <p style={{ fontWeight: "lighter" }}>Address</p>
                  <textarea
                    name="adress"
                    placeholder="Your Adress"
                    className="form-control"
                    value={values.adress}
                    onChange={handleChange}
                    style={{ backgroundColor: "#2D333B", color: "white" }}
                  />
                </div>
                <div className="col-12 col-md-6">
                  <p style={{ fontWeight: "lighter" }}>Bio</p>
                  <textarea
                    name="bio"
                    placeholder="bio"
                    className="form-control"
                    value={values.bio}
                    onChange={handleChange}
                    style={{ backgroundColor: "#2D333B", color: "white" }}
                  />
                </div>
              </div>

              <br />

              <div className="row">
                <div className="col-12 col-md-6">
                  <p style={{ fontWeight: "lighter" }}>Your Pickup Point?</p>
                  <select
                    name="pickupPoint"
                    value={values.pickupPoint}
                    className="form-control"
                    onChange={handleChange}
                    style={{ backgroundColor: "#2D333B", color: "white" }}
                  >
                    <option value={null}>Select where to sell</option>
                    <option value="sirajganj">Sirajganj</option>
                    <option value="bogura">Bogura</option>
                    <option value="mymensing">Mymensing</option>
                  </select>
                </div>

                <div className="col-12 col-md-6">
                  <p style={{ fontWeight: "lighter" }}>Account type</p>
                  <select
                    name="accountType"
                    value={values.accountType}
                    className="form-control"
                    onChange={handleChange}
                    style={{ backgroundColor: "#2D333B", color: "white" }}
                  >
                    <option value={null}>Choose...</option>
                    <option value={false}>ninjaCustomer</option>
                    <option value={true}>ninjaChef</option>
                  </select>
                </div>
              </div>
            </div>

            <br />
            <button style={{ float: "right" }} type="submit" className="btn btn-success">Submit</button>
         
          </form>
        </div>
      )}

    </Formik>


    return (
      <div className="container" style={{ backgroundColor: "", color: "White" }}>
        {form}
      </div>
    );
  }
};

export default connect(mapStateToProps)(EditProfile);