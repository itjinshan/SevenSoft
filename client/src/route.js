import React, { Component } from "react";
import { Route, Switch } from "react-router-dom";

import Home from "./components/home";
import User from "./components/User/User";
import Layout from "./hoc/layout/layout";
import Aisle from "./components/items/aisle";
import Item from "./components/items/item";
import CheckoutReview from "./components/Checkout/checkoutReview";
import OrdersPage from "./components/User/ordersPage";
import SearchResult from "./components/items/searchResult";
import WatchList from "./components/User/watchList";
import CheckoutApp from "./components/Checkout/CheckoutApp";
import Privacy from "./components/footer/privacy";
import Terms from "./components/footer/terms";
import ConfirmationPage from './components/Checkout/ConfirmationPage';
import SimpleMap from './components/footer/SimpleMap'
import Profile from "./components/User/profile/profile";
import AllAisle from './components/items/allAisle'
import OnSale from './components/items/onSale'
import ForgetPassword from './components/User/forgetPassword'
import NotFound from './notFound'
/////////////////////////////////////////

class Router extends Component {
  render() {
    return (
      <Layout>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/User" exact component={User} />
          <Route path="/profile" exact component={Profile} />
          <Route path="/review" exact component={CheckoutReview} />
          <Route path="/orders" exact component={OrdersPage} />
          <Route path="/watchList" exact component={WatchList} />
          <Route path="/searchResult" exact component={SearchResult} />
          <Route path="/checkout" exact component={CheckoutApp} />
          <Route path="/privacy" exact component={Privacy} />
          <Route path="/terms" exact component={Terms} />
          <Route path='/Confirm' exact component={ConfirmationPage} />
          <Route path="/maps" exact component={SimpleMap} />
          <Route path='/onsale' exact component={OnSale} />
          <Route path='/forgetPassword' exact component={ForgetPassword} />
          <Route path='/aisle' exact component={AllAisle} />
          <Route path="/aisle/:aisle" exact component={Aisle} />
          <Route path="/aisle/:aisle/:item" exact component={Item} />
          <Route component={NotFound}/>
        </Switch>
      </Layout>
    );
  }
}

export default Router;
