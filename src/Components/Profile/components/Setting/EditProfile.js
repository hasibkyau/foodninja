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
        <div className="d-flex flex-md-row flex-column" style={{ backgroundColor: "#22272E" }}>


          <div className="row" style={{ backgroundColor: "#22272E", color: "tomato", margin: "15px", borderRadius: '10px' }}>
            <form onSubmit={handleSubmit} >
              <br />

              <p style={{ fontWeight: "bold" }}>Edit Profile Picture</p>
              <div className="row">
              <div className="col-6">
                  <img className="rounded-circle" width={200} height={200} src={this.state.url == "" ? MyProfile.profilePicture : this.state.url} />
                </div>
                <div className="col-6 my-auto"> <input className="form-control" type="file" onChange={this.handleInputFileChange} style={{ backgroundColor: "#2D333B", color: "white" }} />
                  <progress className="form-control" value={this.state.progress} max="100" style={{ backgroundColor: "#2D333B", color: "white" }} />
                </div>
                
              </div>

              <br />
              <p style={{ fontWeight: "bold" }}>Edit Personal Information</p>

              <p style={{ fontWeight: "lighter" }}>Edit Name</p>
              

              <div className="col-6"></div>
              <div className="col-6"></div>
              <input
                name="fName"
                placeholder="First Name"
                className="form-control"
                value={values.fName}
                onChange={handleChange}
                style={{ backgroundColor: "#2D333B", color: "white" }}
              />
              <br />

              <input
                name="lName"
                placeholder="Last Name"
                className="form-control"
                value={values.lName}
                onChange={handleChange}
                style={{ backgroundColor: "#2D333B", color: "white" }}
              />
              <hr />
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
              <br />
              <p style={{ fontWeight: "lighter" }}>Address</p>
              <input
                name="adress"
                placeholder="Your Adress"
                className="form-control"
                value={values.adress}
                onChange={handleChange}
                style={{ backgroundColor: "#2D333B", color: "white" }}
              />
              <br />
              <p style={{ fontWeight: "lighter" }}>Bio</p>
              <textarea
                name="bio"
                placeholder="bio"
                className="form-control"
                value={values.bio}
                onChange={handleChange}
                style={{ backgroundColor: "#2D333B", color: "white" }}
              />
              <br />
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
              <br />
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
              <br />


              <hr />
              <button type="submit" className="btn btn-success">Submit</button>
            </form>
          </div>
        </div>
      )}

    </Formik>


    return (
      <div style={{ backgroundColor: "", color: "tomato" }}>
        {form}
      </div>
    );
  }
};

export default connect(mapStateToProps)(EditProfile);