import React, { Component } from "react";
import "./Landingpage.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { allProducts, removeCart, addCart } from "../../redux/reducer";

class Landingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      name: [],
      price: null
    };
  }

  componentDidMount() {
    this.fetchProducts();
  }

  fetchProducts = () => {
    axios.get("/store/pets").then(response => {
      // console.log("response", response)
      this.props.allProducts(response.data);
      // console.log("responsedata", response.data)
    });
  };
  postProductToCart = () => {
    const { image, name, price } = this.state;
    const postItem = {
      image,
      name,
      price
    };
    axios.post("/store/pets", postItem).then(response => {
      console.log("response Post", response);
      console.log("response Post Data", response.data);
      this.props.addCart(response.data);
    });
  };
  // removeCart

  render() {
    const { productList } = this.props;

    const listItems = productList.map(product => {
      return (
        <div className="productBox">
          <div className="flipinnerbox">
          <div className="flipcardfront">
            <img src={product.image} alt="productimage" />
            </div>
          </div>
          <div>{product.name}</div>
          <div>${product.price}</div>
          <div className="flipcardback">
            <p> Hello</p>
          </div>
          <NavLink to="/">
            {" "}
            <div>
              <button onClick={() => {this.postProductToCart();
                }}>
                Add to Cart
              </button>
            </div>
          </NavLink>
        </div>
      );
    });
    return (
      <div className="landingpage">
        <div className="title">
          <h1>Stella & Toby Pet World</h1>
        </div>
        <div className="product">{listItems}</div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { productList, cart } = state;
  return {
    productList,
    cart
  };
};
export default connect(
  mapStateToProps,
  { allProducts, removeCart, addCart }
)(Landingpage);
