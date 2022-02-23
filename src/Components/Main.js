import React, { Component } from 'react';
import Header from './Header/Header';
import BurgerBuilder from './BurgerBuilder/BurgerBuilder';
import Orders from './Orders/Orders';
import Checkout from './Orders/Checkout/Checkout';
import Auth from './Auth/Auth';
import Logout from './Auth/Logout';
import Home from './Home/Home';
import { Route, Switch, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { authCheck } from '../redux/authActionCreators';
import ReactFirebaseFileUpload from '../firebase/ReactFirebaseFileUpload';
//import AddMenu from './AddMenu/AddMenu';
import Menu from './Menu/Menu';
const mapStateToProps = state => {
    return {
        token: state.token,
    }
}

const mapDispatchToProps = dispatch => {
    return {
        authCheck: () => dispatch(authCheck()),
    }
}

class Main extends Component {
    componentDidMount() {
        this.props.authCheck();
    }
    render() {
        let routes = null;
        if (this.props.token === null) {
            routes = (
                <Switch>
                    <Route path="/login" component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            )
        } else {
            routes = (
                <Switch>
                    <Route path="/addmenu" exact component={Menu} />
                    <Route path="/orders" exact component={Orders} />
                    <Route path="/checkout" exact component={Checkout} />
                    <Route path="/logout" exact component={Logout} />
                    <Route path="/burgerBuilder" exact component={BurgerBuilder} />
                    <Route path="/" exact component={Home} />
                    <Route path="/upload" exact component={ReactFirebaseFileUpload} />
                    <Redirect to="/" />
                </Switch>
            )
        }
        return (
            <div>
                <Header />
                <div className="container">
                    {routes}
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);