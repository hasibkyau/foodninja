import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDishes } from '../../redux/actionCreators';
import MenuItem from './MenuItems';

const mapStateToProps = state => {
    return {
        //MENU_ITEMS: state.dishes,
        //MENU_ITEMS: state.MENU_ITEMS,
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
    }

    onDishSelect = dish => {
        this.setState({
            selectedDish: dish,
            modalOpen: !this.state.modalOpen
        });
    }

    componentDidMount() {
        this.props.fetchDishes();
        console.log("mounted");
    
    }

    render() {
        document.title = "foodninja";

        let MENU_ITEMS = JSON.parse(localStorage.getItem("MENU_ITEMS"));
        let dishes = MENU_ITEMS.dishes;
        let comments = MENU_ITEMS.comments;
        console.log("dishes: ", dishes);
        console.log("comments: ", comments);
        
        const menu = dishes.map(item => {
            return (
                <MenuItem
                    dish={item}
                    key={item.id}
                    DishSelect={() => this.onDishSelect(item)}
                />
            );
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


export default connect(mapStateToProps, mapDispatchToProps)(Menu);