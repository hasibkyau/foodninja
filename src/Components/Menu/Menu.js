import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDishes } from '../../redux/actionCreators';

const mapStateToProps = state => {
    return {
        MENU_ITEMS : state.dishes,
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
        console.log("Mounted");
    }

    componentDidUpdate(){
        console.log("Updated");
    }
    render() {
        let menu = this.props.MENU_ITEMS.dishes;
        let MenuItem = menu.map(item => {
            return(
                <div key={item.Id}>
                    <p>{item.description}</p>
                </div>
            )
        })
        return (
            <div className="container">
               {/* {MenuItem} */}
            </div>
        );
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Menu);