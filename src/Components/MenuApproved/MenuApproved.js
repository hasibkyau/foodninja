import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDishes } from '../../redux/actionCreators';
import MenuItem from './MenuItems';
import axios from 'axios';

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

class MenuApproved extends Component {    
    state = {
        selectedDish: null,
        modalOpen: false,
    }

    onDishRemove = dish => {
        let id = dish.id;
        dish.approved = false;
        if (confirm('Are you sure you want to save this thing into the database?')) {
            // Save it!
            axios.put("https://foodninja-4c3c8-default-rtdb.firebaseio.com/dishes/" + id + ".json", dish)
                .then(response => console.log("has approved", response.data,))
        } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
        }
        this.setState({
            selectedDish: dish,
            modalOpen: !this.state.modalOpen
        });
    }

    onDishDelete = dish => {
        let id = dish.id;
        if (confirm('Are you sure you want to save this thing into the database?')) {
            // Save it!
            axios.delete("https://foodninja-4c3c8-default-rtdb.firebaseio.com/dishes/" + id + ".json")
            .then(response => console.log("Deleted", response.data,))
          } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
          }
        this.setState({
            selectedDish: dish,
            modalOpen: !this.state.modalOpen
        });
    }

    // componentDidMount() {
    //     this.props.fetchDishes();
    // }
    

    render() {
        document.title = "foodninja";
        let dishes = this.props.dishes;
        
        const menu = dishes.map(item => {
            if(item.approved){
            return (
                <MenuItem
                    dish={item}
                    key={item.id}
                    DishRemove={() => this.onDishRemove(item)}
                    DishDelete={() => this.onDishDelete(item)}
                />
            );
        }
        })

        return (
            <div className="container">
                <div className="row">
                    <div className='row justify-content-md-center"'>
                        {menu}
                    </div>
                </div>
            </div>
        );
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(MenuApproved);