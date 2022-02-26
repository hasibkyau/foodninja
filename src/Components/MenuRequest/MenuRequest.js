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

        // axios.post('https://foodninja-4c3c8-default-rtdb.firebaseio.com/APPROVED_MENU.json', dish)
        // .then(console.log("Uploading to approve database: ",dish))
        // .then(data => console.log("suucess: ", data))
        // .catch(err => console.log("Error: ", err))

        axios.put("https://foodninja-4c3c8-default-rtdb.firebaseio.com/dishes/"+ id + ".json", dish)
        .then(response => console.log("has approved", response.data, ))        
    }

    onDishDetail = dish =>{
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
            if(!item.approved){
            return (
                <MenuFilter
                    dish={item}
                    key={item.id}
                    DishApprove={() => this.onDishApprove(item)}
                    dishDetail = {() => this.onDishDetail(item)}
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


export default connect(mapStateToProps, mapDispatchToProps)(Menu);