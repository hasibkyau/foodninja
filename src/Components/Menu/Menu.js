import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDishes } from '../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        dishes: state.dishes,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchDishes: () => dispatch(fetchDishes()),
    }
}

class Menu extends Component {
    state = {
        selectedDish: null,
        modalOpen: false
    }

    componentDidMount() {
        this.props.fetchDishes();
    }

    componentDidUpdate(){
        console.log(this.props.dishes);
    }
    render() {
        return (
            <div className="container">
                {/* {this.props.dishes.comments[0].author} */}
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);