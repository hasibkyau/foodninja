import React, { useState, useEffect, Component } from "react";
import { storage } from "./firebase";
import { Card, CardImg, CardBody } from "reactstrap";
import axios from "axios";

class ReactFirebaseFileUpload extends Component {
  state = {
    image: null,
    url: "",
    progress: 0,
    MyUrl: null,
  }

  getImageUrlFormFirebase = () => {
    storage
      .ref("images/Menu")
      .child("0burger.jpg")
      .getDownloadURL()
      .then(url => {
        this.setState({
          MyUrl: url,
        })
      });
    console.log("my url is:", this.state.MyUrl);
  }

  handleChange = e => {
    if (e.target.files[0]) {
      this.setState({
        image: e.target.files[0]
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
  };


  render() {

    return (
      <div>
        <progress value={this.state.progress} max="100" />
        <br />
        <br />
        <input type="file" onChange={this.handleChange} />
        <button onClick={this.handleUpload}>Upload</button>
        <br />
        {this.state.url}
        <br />
        <img src={this.state.url} />
        <Card>
          <CardBody>
            <CardImg src={this.state.MyUrl} />
          </CardBody>
        </Card>
        <button onClick={this.getImageUrlFormFirebase}>Find Url</button>
      </div>
    );
  }
};

export default ReactFirebaseFileUpload;