import React, {Component } from "react";
import { storage } from "../../../../firebase/firebase";
import { Card, CardImg, CardBody } from "reactstrap";
import axios from "axios";
import { connect } from "react-redux";
import { loadOrders } from "../../../../redux/actionCreators";

const mapStateToProps = state => {
  return {

    userId: state.userId,
    token: state.token,
  }
}

class EditProfile extends Component {
  state = {
    image: null,
    url: "",
    progress: 0,
    MyUrl: null,
  }

  getImageUrlFormFirebase = () => {
    console.log("Hahaha");
    console.log("token: ", this.props.token);
    const ImgUrl = {
      Url: "https://firebasestorage.googleapis.com/v0/b/foodninja-4c3c8.appspot.com/o/images%2FMenu%2Fninjachefsmall-02.png?alt=media&token=a6f5464f-de91-4136-a456-947f336775b8",
    }
    axios.post("https://foodninja-4c3c8-default-rtdb.firebaseio.com/ImgUrl.json?", ImgUrl)
      .then(response => {
        console.log("trying to send to database:", response);
      }) 
    // storage
    //   .ref("images/Menu")
    //   .child("0burger.jpg")
    //   .getDownloadURL()
    //   .then(url => {
    //     this.setState({
    //       MyUrl: url,
    //     })
    //   });
    // console.log("my url is:", this.state.MyUrl);
  }

  handleChange = e => {
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

  }

  render() {
    return (
      <div style={{backgroundColor:"white"}}>
        <progress value={this.state.progress} max="100" />
        <br />
        <br />
        <input type="file" onChange={this.handleChange} />
        <button onClick={this.handleImgSave}>Upload</button>
        <br />
        <br />
        
        <Card>
          <CardBody>
            <img height={200} width = {200} className="rounded-circle" src={this.state.url} />
          </CardBody>
        </Card>
       </div>
    );
  }
};

export default connect(mapStateToProps)(EditProfile);