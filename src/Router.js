import React from "react";
import { Switch, Route } from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import CartScreen from "./screens/CartScreen";
import OrderScreen from "./screens/OrderScreen";
import CheckoutScreen from "./screens/CheckoutScreen";

const Router = () => (
    <Switch>
      <Route path="/" component={HomeScreen} exact />
      <Route path="/order" component={OrderScreen} />
      <Route path="/cart" component={CartScreen} />
      <Route path="/checkout" component={CheckoutScreen} />
    </Switch>
)

export default Router;
