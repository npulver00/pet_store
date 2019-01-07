import React, { Component } from "react";
import "./Landingpage.css";
import axios from "axios";
import { NavLink } from "react-router-dom";
import { connect } from "react-redux";
import { allProducts, removeCart, addCart, setUser } from "../../redux/reducer";

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
  postProductToCart = id => {
    axios.post("/store/cart", { id }).then(response => {
      console.log("response Post", response);
      console.log("response Post Data", response.data);
      this.props.addCart(response.data);
    });
  };
  // removeCart

  render() {
    const { productList } = this.props;
    // const {cart}= this.props.user;

    console.log("productlist",productList)
    const listItems = this.props.productList.length ? this.props.productList.map(product => {
      return (
        <div className="productBox">
          <div className="flipinnerbox">
            <div className="flipcardfront">
              <img src={product.image} alt="productimage" />
            </div>
          </div>
          <div>{product.name}</div>
          <div>${product.price}</div>
          <button
            onClick={() => {
              this.postProductToCart(product.id);
            }}
          >
            Add to Cart
          </button>
          <div className="flipcardback">
            <p>Hello</p>
          </div>
          {/* <NavLink to="/"> */} <div />
          {/* </NavLink> */}
        </div>
      );
    }) : "loading"
    return (
      <div className="landingpage">
        <div className="title">
          <h1>Stella & Toby Pet World</h1>
        </div>
        <div className="product">{listItems}</div>

        <div />
      </div>
    );
  }
}

const mapStateToProps = state => {
  const { productList } = state;
  return {
    productList
  };
};
export default connect(
  mapStateToProps,
  { allProducts, removeCart, addCart, setUser }
)(Landingpage);
