import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDishes } from '../../../../redux/actionCreators';
import MenuItem from './MenuItems';
import { CardColumns, Modal, ModalBody, ModalFooter, Button } from 'reactstrap';
import DishDetail from './DishDetails';

// import { addComment, fetchDishes, fetchComments} from '../../redux/actionCreator';
// import Loading from './Loading';
// import { Alert } from 'reactstrap';


const mapStateToProps = state => {
    return {
        dishes: state.dishes,
        // comments: state.comments
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDishes: () => dispatch(fetchDishes()),
        // fetchComments: () => dispatch(fetchComments())
    }
}

class MyProducts extends Component {
    state = {
        selectedDish: null,
        modalOpen: false,
    }

    onDishSelect = dish => {
        this.setState({
            selectedDish: dish,
            modalOpen: !this.state.modalOpen
        });
    }

    componentDidMount() {
        this.props.fetchDishes();
        // this.props.fetchComments();
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    render() {
        document.title = "foodninja";
        let userInfo = JSON.parse(localStorage.getItem("MyProfile"));
        let dishes = this.props.dishes;

        let approvedItem = null;
        let pendingItem = null;

        approvedItem = dishes.map(item => {
            if (item.sellerId === userInfo.userId) {
                if (item.approved) {
                    return (
                        <MenuItem
                            dish={item}
                            key={item.id}
                            DishSelect={() => this.onDishSelect(item)}
                        />
                    );
                }
            }
        })

        pendingItem = dishes.map(item => {
            if (item.sellerId === userInfo.userId) {
                if (!item.approved) {
                    return (
                        <MenuItem
                            dish={item}
                            key={item.id}
                            DishSelect={() => this.onDishSelect(item)}
                        />
                    );
                }
            }
        })


        let dishDetail = null;
        if (this.state.selectedDish != null) {
            //const comments = this.props.comments.comments.filter(comment => comment.dishId === this.state.selectedDish.id)

            dishDetail = <DishDetail
                dish={this.state.selectedDish}
            //comments={comments}
            //addComment={this.props.addComment}
            //commentsIsLoading = {this.props.isLoading} 
            />
        }

        return (
            <div className="container">
                <h3 style={{ color: "tomato" }}>Approved Item</h3>
                <div className="row">
                    {approvedItem}
                </div>

                <h3 style={{ color: "tomato" }}>Pending Item</h3>

                <div className='row justify-content-lg-center"'>
                    {pendingItem}
                </div>

                <Modal style={{ scrollable: "true" }} isOpen={this.state.modalOpen}>
                    <ModalBody>
                        {dishDetail}
                    </ModalBody>
                    <ModalFooter>
                        <Button color="secondary" onClick={this.toggleModal}>
                            Close
                        </Button>
                    </ModalFooter>
                </Modal>

            </div>
        );
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(MyProducts);