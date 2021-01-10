import React, { Component } from "react";
import Products from "../components/Products";

export default class HomeScreen extends Component {
  render() {
    return (
      <div>
        <div className="content">
          <div className="main">
            <Products></Products>
          </div>
        </div>
      </div>
    );
  }
}
