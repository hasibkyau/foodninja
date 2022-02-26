import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchDishes } from '../../redux/actionCreators';
import MenuItem from './MenuItems';

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
        // this.props.fetchComments();
    }

    toggleModal = () => {
        this.setState({
            modalOpen: !this.state.modalOpen
        })
    }

    render() {
        document.title = "foodninja";
        let dishes = this.props.dishes;
        
        const menu = dishes.map(item => {
            if(item.approved){
            return (
                <MenuItem
                    dish={item}
                    key={item.id}
                    DishSelect={() => this.onDishSelect(item)}
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