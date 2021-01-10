import React, { Component } from "react";
import { connect } from "react-redux";
import { fetchOrders } from "../actions/orderActions";

class Orders extends Component {
  componentDidMount() {
    this.props.fetchOrders();
  }
  render() {
    const orderItem = this.props.orders;
    return !orderItem ? (
      <h2>Orders</h2>
    ) : (
      <div className="orders">
        <h2>Orders</h2>
        <table>
          <thead>
            <tr>
              <th>BOOK TITLE</th>
              <th>QUANTITY</th>
            </tr>
          </thead>
          <tbody>
            {orderItem.cartItems.map((order) => (
              <tr>
                <td>{order.title}</td>
                <td>
                  {order.count}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  }
}
export default connect(
  (state) => ({
    orders: state.order.orders
  }),
  {
    fetchOrders,
  }
)(Orders);
