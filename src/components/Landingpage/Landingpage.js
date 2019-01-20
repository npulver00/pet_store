import React, { Component } from "react";
import "./Landingpage.css";
import axios from "axios";
import { connect } from "react-redux";
import { allProducts, removeCart, addCart, setUser } from "../../redux/reducer";
import Slick from "../Slick/Slick";


class Landingpage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      image: [],
      name: [],
      price: null,
      filterArray: [],

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
  postProductToCart = (product_id, price) => {
    const carttoDB = {
      auth0_id: this.props.user.auth0_id,
      product_id: product_id,
      price: price

    }
    // console.log("carttoDB", carttoDB, this.props.user)

    axios.post("/store/cart", carttoDB).then(response => {
      // console.log("response Post", response);
      // console.log("response Post Data", response.data);
      console.log('item successfully added to db', response)
    });
  };
  // removeCart

  //filter
  multiplefilter = (filter) => {

    const filteredArray = this.props.productList.filter(product => product.category.includes(`${filter}`))
    this.setState({
      filterArray: filteredArray

    })

  }

  render() {
    const listItems = this.props.productList.length ? this.props.productList.map(product => {
      return (
        <div className="flip-card" key="caard">
          <div className="flip-card-inner" key="inner">
            <div className="flip-card-front">
              <img src={product.image} alt="productimage" key="front" />
            </div>
            <div className="flip-card-back" key="back">
              <div className="backinfo">{product.feature}</div>

            </div>
          </div>
          <div className="cardname">{product.name}</div>
          <div className="price">${product.price}</div>
          <button
            onClick={() => {
              this.postProductToCart(product.id, product.price);
            }}
          >
            Add to Cart
          </button>

        </div>

      )
    }) : "loading";
    return (

      <div className="landingpage" key="page">
        <div className="slick1"><Slick /></div>
        <div className="allfilter">
          <label className="choose1">
            <select className="input1" onChange={(e) => { this.multiplefilter(e.target.value) }}>
              <option className="input" value="Dogs">Dogs: Select Items</option>
              <option className="input" value="dogfood" >Dog Food</option>
              <option className="input" value="dogtoys">Dog Toys</option>
            </select>
          </label>
          <h3>Shop by Pet</h3>
          <label className="choose1">
            <select className="input1" onChange={(e) => { this.multiplefilter(e.target.value) }}>
              <option className="input" value="Cats">Cats: Select Items</option>
              <option className="input" value="catfood">Cat Food</option>
              <option className="input" value="cattoys"> Cat Toys</option>

            </select>
          </label>
        </div>
        <div className='list-stuff' key="stuff">
          {!this.state.filterArray.length > 0 && <div className="product">{listItems}</div>}

          <div />
          {this.state.filterArray.map(e => {
            return (
              <div className="products">
                <div className="flip-card">
                  <div className="flip-card-inner">
                    <div className="flip-card-front">
                      <img src={e.image} alt="eimage" />
                    </div>
                    <div className="flip-card-back">
                      <div className="backinfo">{e.feature}</div>

                    </div>
                  </div>
                  <div className="cardname">{e.name}</div>
                  <div className="price">${e.price}</div>
                  <button
                    onClick={() => {
                      this.postProductToCart(e.id, e.price);
                    }}
                  >
                    Add to Cart
          </button>

                </div>

              </div>

            )
          })}

        </div >


      </div>


      ///here


    );
  }
}

const mapStateToProps = state => {
  const { productList, user } = state;
  return {
    productList,
    user
  };
};
export default connect(
  mapStateToProps,
  { allProducts, removeCart, addCart, setUser }
)(Landingpage);
