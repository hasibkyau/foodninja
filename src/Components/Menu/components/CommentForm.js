import axios from 'axios';
import React, { Component } from 'react';
import { Form, Button, Input } from 'reactstrap';
import dateFormat from 'dateformat';
import { connect } from 'react-redux';
import { fetchDishes } from '../../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        // comments: state.comments,

    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDishes: () => dispatch(fetchDishes()),
        // fetchComments: () => dispatch(fetchComments())
    }
}


class CommentForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            author: '',
            rating: '',
            comment: ''
        }
        this.handleInputChange = this.handleInputChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleInputChange = event => {
        this.setState({
            [event.target.name]: event.target.value,
        })
    }

    handleSubmit = event => {
        let MyProfile = JSON.parse(localStorage.getItem("MyProfile"));

        const comment = {
            author: MyProfile.fName + " " + MyProfile.lName,
            authorId: MyProfile.userId,
            comment: this.state.comment,
            rating: this.state.rating,
            dishId: this.props.dishId,
            authorImg: MyProfile.profilePicture,
            date: new Date(),
        }
        console.log("submit", comment);
        axios.post("https://foodninja-4c3c8-default-rtdb.firebaseio.com/dishes/" + this.props.dishId + "/comments/.json", comment)
            .then(response => {
                console.log("success:", response)
                this.props.fetchDishes();
            })
        //this.props.addComment(this.props.dishId, this.state.rating, this.state.author, this.state.comment);

        // this.setState({
        //     author: '',
        //     rating: '',
        //     comment: ''
        // });

        event.preventDefault();
    }

    render() {
        //console.log(this.props);
        let MyProfile = JSON.parse(localStorage.getItem("MyProfile"));

        return (
            <div>
                <Form onSubmit={this.handleSubmit}>

                    <Input
                        type="select"
                        name="rating"
                        value={this.state.rating}
                        onChange={this.handleInputChange} >
                        <option>1</option>
                        <option>2</option>
                        <option>3</option>
                        <option>4</option>
                        <option>5</option>
                    </Input>
                    <br />
                    <div className='row p-2'>
                        <img src={MyProfile.profilePicture} height={50} width={50} style={{ border: "2px solid black" }} className="mr-2 rounded-circle" />
                        <input
                            style={{ borderRadius: "30px", width: "80%", paddingLeft: "15px" }}
                            type="text"
                            name="comment"
                            value={this.state.comment}
                            placeholder="Your Comment"
                            onChange={this.handleInputChange}
                            required>
                        </input>
                    </div>
                    <br />
                    <Button className='btn btn-success btn-sm' type="submit">Comment</Button>
                </Form>
            </div>
        );
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);