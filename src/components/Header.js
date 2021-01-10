import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    let itemCount = this.props.totalItem;
    return (
      <header>
        <div><Link to="/">BookStore</Link></div>
        <div className="nav-bar">
            <Link to="/">Home</Link>
            <Link to="/order">My Orders</Link>
            <Link to="/cart">Cart ({this.props.totalItem ? itemCount : 0})</Link>
        </div>
      </header>
    );
  }
}

export default connect(
  (state) => ({
      totalItem : state.cart.totalItem
  }),
)(Header);
