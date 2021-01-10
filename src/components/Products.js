import React, { Component } from "react";
import { Link } from 'react-router-dom';
import Fade from "react-reveal/Fade";
import Modal from "react-modal";
import Zoom from "react-reveal/Zoom";
import { connect } from "react-redux";
import { fetchProducts } from "../actions/productActions";
import { addToCart, buyNow } from "../actions/cartActions";

class Products extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      product: null,
    };
  }
  componentDidMount() {
    this.props.fetchProducts();
  }
  openModal = (product) => {
    this.setState({ product });
  };
  closeModal = () => {
    this.setState({ product: null });
  };
  render() {
    const { product } = this.state;
    return (
      <div>
        <Fade bottom cascade>
          {!this.props.products ? (
            <div>Loading...</div>
          ) : (
            <ul className="products">
              {this.props.products.map((product) => (
                <li key={product._id}>
                  <div className="product">
                    <a
                      href={"#" + product._id}
                      onClick={() => this.openModal(product)}
                    >
                      <img src={product.imageLink} alt={product.title}></img>
                      <div className="margin1">
                          <div><b>Title:</b> {product.title}</div>
                          <span><b>Author:</b> {product.author}</span>
                      </div>
                    </a>
                    <div className="product-price">
                      <Link to={{pathname: `/checkout`}}>
                        <button
                          onClick={() => this.props.buyNow(product)}
                          className="button primary width1"
                        >
                          Buy Now
                        </button>
                      </Link>
                      <button
                          onClick={() => this.props.addToCart(product)}
                          className="button primary"
                        >
                          Add To Cart
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </Fade>
        {product && (
          <Modal isOpen={true} ariaHideApp={false} onRequestClose={this.closeModal}>
            <Zoom>
              <button className="close-modal" onClick={this.closeModal}>
                x
              </button>
              <div className="product-details">
                <img src={product.imageLink} alt={product.title}></img>
                <div className="product-details-description">
                  <p>
                   <strong>{product.title}</strong>
                  </p>
                  <p>
                   Author: <strong>{product.author}</strong>
                  </p>
                  <p>
                   Pages: <strong>{product.pages}</strong>
                  </p>
                  <p>
                   ISBN: <strong>{product._id}</strong>
                  </p>
                  <p>
                   Price: <strong>{product.price}</strong>
                  </p>
                  
                  <p>{product.description}</p>
                  <div className="product-price">
                    <button
                      className="button primary"
                      onClick={() => {
                        this.props.addToCart(product);
                        this.closeModal();
                      }}
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </div>
            </Zoom>
          </Modal>
        )}
      </div>
    );
  }
}
export default connect(
  (state) => ({ products: state.products.filteredItems }),
  {
    fetchProducts,
    addToCart,
    buyNow,
  }
)(Products);
