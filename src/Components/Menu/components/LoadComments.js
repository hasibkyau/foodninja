import React, { Component } from 'react';
import dateFormat from 'dateformat';
import Loading from './Loading';
import { Card, CardBody, CardFooter, CardImg, CardHeader } from 'reactstrap';

class LoadComments extends Component {
    state = {
        comments: []
    }

    componentDidMount() {

        console.log(this.props);
        let comments = [];
        for (let key in this.props.comments) {
            comments.push({
                ...this.props.comments[key],
                id: key,
            })
        }
        console.log(comments);
        this.setState({
            comments : comments
        })
    }

    render() {

        return (
            this.state.comments.map(comment => {
                return (
                    <div className='p-2 my-2' key={comment.id}>
                        <div className='row' >
                            <div className='col-2'>
                                <img src={comment.authorImg} height={50} width={50} style={{ border: "2px solid black" }} className="mr-2 rounded-circle" />
                            </div>

                            <div className='col-10' style={{ backgroundColor: "#F0F1F3", borderRadius: "10px" }}>
                                <h5>{comment.author}<span style={{fontWeight:"lighter", fontSize:"15px", color:'tomato'}}> Rating: {comment.rating}</span></h5>
                                <p>{comment.comment}</p>
                                <p>{dateFormat(comment.date, "dddd, mmmm dS, yyyy, h:MM TT")}</p>
                            </div>
                        </div>

                    </div>

                );
            })


        );

    }
}

export default LoadComments;