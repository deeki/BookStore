import React, { Component } from "react";
import formatCurrency from "../util";
import Fade from "react-reveal/Fade";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { removeFromCart } from "../actions/cartActions";
import { createOrder, clearOrder, clearCart } from "../actions/orderActions";

class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      address: "",
      city: "",
      state: "",
      country: "",
      showCheckout: false,
    };
  }
  handleInput = (e) => {
    this.setState({ [e.target.name]: e.target.value });
  };
  createOrder = (e) => {
    e.preventDefault();
    const order = {
      name: this.state.name,
      email: this.state.email,
      address: this.state.address,
      city: this.state.city,
      state: this.state.state,
      country: this.state.country,
      cartItems: this.props.cartItems,
      total: this.props.cartItems.reduce((a, c) => a + c.price * c.count, 0),
    };
    this.props.createOrder(order);
  };
  closeModal = () => {
    window.location.reload(false);
    this.props.clearOrder();
    var p = this.props.cartItems;
    this.props.clearCart(p);
  };
  render() {
    const { cartItems, order } = this.props;
    return (
      <div>
        {cartItems.length === 0 ? (
          <div className="cart cart-header">Cart is empty</div>
        ) : (
          <div className="cart cart-header">
            You have {cartItems.length} in the cart{" "}
          </div>
        )}

        {order && (
          <Modal isOpen={true} ariaHideApp={false} onRequestClose={this.closeModal}>
            <Zoom>
              <Link to={{pathname: `/`}}>
                  <button className="close-modal" onClick={this.closeModal}>
                    x
                  </button>
              </Link>
              <div className="order-details">
                <h3 className="success-message">Your order has been placed.</h3>
                <h2>Order {order._id}</h2>
                <table>
                    <tbody>
                        <tr>
                        <td>Name:</td>
                        <td>{order.name}</td>
                    </tr>
                    <tr>
                        <td>
                            Email:
                        </td>
                        <td>{order.email}</td>
                    </tr>
                    <tr>
                        <td>
                           City:
                        </td>
                        <td>{order.city}</td>
                    </tr>
                    <tr>
                        <td>
                            State:
                        </td>
                        <td>{order.state}</td>
                    </tr>
                    <tr>
                        <td>
                            Country:
                        </td>
                        <td>{order.country}</td>
                    </tr>
                    <tr>
                        <td>
                            Address:
                        </td>
                        <td>{order.address}</td>
                    </tr>
                    <tr>
                        <td>
                            Total:
                        </td>
                        <td>{order.total}</td>
                    </tr>
                    <tr>
                        <td>
                            Cart Item:
                        </td>
                        <td>
                          {order.cartItems.map((x) => (
                            <div key={x._id}>
                              {x.count} {" x "} {x.title}
                            </div>
                          ))}
                        </td>
                    </tr>
                    </tbody>
                </table>
              </div>
            </Zoom>
          </Modal>
        )}
        <div>
          <div className="cart">
            <Fade left cascade>
              <ul className="cart-items">
                {cartItems.map((item) => (
                  <li key={item._id}>
                    <div>
                      <img src={item.imageLink} alt={item.title}></img>
                    </div>
                    <div>
                      <div>{item.title}</div>
                      <div className="right">
                        {formatCurrency(item.price)} x {item.count}{" "}
                        <button
                          className="button"
                          onClick={() => this.props.removeFromCart(item)}
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </Fade>
          </div>
          {cartItems.length !== 0 && (
            <div>
              <div className="cart">
                <div className="total">
                  <div>
                    Total:{" "}
                    {formatCurrency(
                      cartItems.reduce((a, c) => a + c.price * c.count, 0)
                    )}
                  </div>
                  <button
                    onClick={() => {
                      this.setState({ showCheckout: true });
                    }}
                    className="button primary"
                  >
                    Proceed
                  </button>
                </div>
              </div>
              {this.state.showCheckout && (
                <Fade right cascade>
                  <div className="cart">
                    <form onSubmit={this.createOrder}>
                      <ul className="form-container">
                        <li>
                          <input
                            name="name"
                            type="text"
                            required
                            onChange={this.handleInput}
                            placeholder="Name" 
                          ></input>
                        </li>
                        <li>
                          <input
                            name="email"
                            type="text"
                            required
                            onChange={this.handleInput}
                            placeholder="Email" 
                          ></input>
                        </li>
                        <li>
                          <input
                            name="address"
                            type="text"
                            required
                            onChange={this.handleInput}
                            placeholder="Address" 
                          ></input>
                        </li>
                        <li>
                          <input
                            name="city"
                            type="text"
                            required
                            onChange={this.handleInput}
                            placeholder="City" 
                          ></input>
                        </li>
                        <li>
                          <input
                            name="state"
                            type="text"
                            required
                            onChange={this.handleInput}
                            placeholder="State" 
                          ></input>
                        </li>
                        <li>
                          <input
                            name="country"
                            type="text"
                            required
                            onChange={this.handleInput}
                            placeholder="Country" 
                          ></input>
                        </li>
                        <li className="flexreverse">
                          <button className="button primary width1" type="submit">
                            Checkout
                          </button>
                           <Link to={{pathname: `/`}}>
                            <button className="button primary width1">
                              Cancel
                            </button>
                          </Link>
                        </li>
                      </ul>
                    </form>
                  </div>
                </Fade>
              )}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    order: state.order.order,
    cartItems: state.cart.cartItems,
  }),
  { removeFromCart, createOrder, clearOrder, clearCart }
)(Cart);
