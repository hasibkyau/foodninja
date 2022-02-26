import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDishes } from '../../redux/actionCreators';
import MenuFilter from './MenuFilter';
import axios from 'axios';
import { Redirect } from 'react-router/cjs/react-router.min';

const mapStateToProps = state => {
    return {
        //MENU_ITEMS: state.dishes,
        MENU_ITEMS: state.MENU_ITEMS,
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
        modalOpen: false,
        approved: false,
    }

    onDishApprove = dish => {
        let id = dish.id;
        dish.approved = true;
        if (confirm('Are you sure you want to save this thing into the database?')) {
            // Save it!
            axios.put("https://foodninja-4c3c8-default-rtdb.firebaseio.com/dishes/" + id + ".json", dish)
                .then(response => console.log("has approved", response.data,))
        } else {
            // Do nothing!
            console.log('Thing was not saved to the database.');
        }
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

    }

    onDishDetail = dish => {
        this.setState({
            selectedDish: dish,
            modalOpen: !this.state.modalOpen
        });
        console.log("details", dish);
    }

    componentDidMount() {
        this.props.fetchDishes();
        console.log("mounted");

    }

    render() {
        document.title = "foodninja";
        
        let dishes = this.props.dishes;
        const menu = dishes.map(item => {
            if (!item.approved) {
                return (
                    <MenuFilter
                        dish={item}
                        key={item.id}
                        dishApprove={() => this.onDishApprove(item)}
                        dishDetail={() => this.onDishDetail(item)}
                        dishDelete={() => this.onDishDelete(item)}
                    />
                );
            }
        })

        return (
            <div className="container">
                <div className='row justify-content-md-center"'>
                    {menu}
                </div>
            </div>
        );
    }

}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);