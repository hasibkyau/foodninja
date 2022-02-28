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
import AddMenu from './AddMenu/AddMenu';
import MenuRequest from './MenuRequest/MenuRequest';
import Menu from './Menu/Menu';
import MenuApproved from './MenuApproved/MenuApproved';
import DashBoard from './AdminPanel/Dashboard';
import Profile from './Profile/Profile';

const mapStateToProps = state => {
    return {
        token: state.token,
        userId: state.userId,
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
        let adminpanel = null;
        let routes = null;
        if (this.props.token === null) {
            routes = (
                <Switch>
                    <Route path="/login" component={Auth} />
                    <Redirect to="/login" />
                </Switch>
            )
        } else {

            if (this.props.userId === "YswMnUug7edGO7TlZlJsWpFhKbp2") {
                routes = (
                    <Switch>
                        <Route path="/profile" exact component = {Profile}/>
                        <Route path="/menu" exact component={Menu} />
                        <Route path="/menurequest" exact component={MenuRequest} />
                        <Route path="/addmenu" exact component={AddMenu} />
                        <Route path="/orders" exact component={Orders} />
                        <Route path="/checkout" exact component={Checkout} />
                        <Route path="/logout" exact component={Logout} />
                        <Route path="/burgerBuilder" exact component={BurgerBuilder} />
                        <Route path="/" exact component={Home} />
                        <Route path="/approvedmenu" exact component={MenuApproved} />
                        <Route path="/upload" exact component={ReactFirebaseFileUpload} />
                        <Route path="/dashboard" exact component = {DashBoard}/>
                        <Redirect to="/" />
                    </Switch>
                )

            } else {
                routes = (
                    <Switch>
                        <Route path="/profile" exact component = {Profile}/>
                        <Route path="/menu" exact component={Menu} />
                        <Route path="/addmenu" exact component={AddMenu} />
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
        }
        return (
            <div>
                <Header />
                <div >
                    {routes}
                </div>
            </div>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(Main);