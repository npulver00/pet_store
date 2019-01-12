import React, { Component } from 'react';
import "./Cart.css";
import { connect } from 'react-redux';
import { NavLink } from "react-router-dom";
import axios from 'axios';
import { inputAddress } from "../../redux/reducer";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkoutCart: [],
            total: []
        }
    }

    componentDidMount() {
        this.getProductInCart()
        this.totalfromcart()
    }

    getProductInCart = () => {
        axios.get(`/store/cart/${this.props.user.auth0_id}`).then(response => {
            this.setState({
                checkoutCart: response.data,
            })
        })
    }
    deleteProductfromCart = (product_id, quantity) => {

        console.log("id front", product_id)
        axios.delete(`/store/cart/${product_id}/${quantity}`).then(response => {
            console.log("Delete Cart Front", response)
            // this.setState({
            //     checkoutCart: response.data
            // })
            this.getProductInCart()
        })
    }
    totalfromcart = () => {

        axios.get('/store/cart').then(response => {
            console.log("totalcart", response)
            this.setState({
                total: response.data[0].sum
            })
        })
    }



    render() {


        const cartItems = this.state.checkoutCart.map(item => {

            return (
                <div className="cartCard">
                    <div><img src={item.image} alt="photo" /></div>
                    <div>Name:{item.name}</div>
                    <div>Quantity:{item.quantity}</div>
                    <button>+</button>
                    <div>Price:{item.totalprice}</div>
                    <button onClick={() => this.deleteProductfromCart(item.product_id, item.quantity)}>Delete</button>

                </div>
            )
        })
        console.log("cartitems0000", this.state.checkoutCart)
        return (
            <div>
                <div className="cart">{this.props.user.auth0_id ? cartItems : alert("~PLEASE LOGIN FIRST~")}</div>
                <div><NavLink to="/form"><button>Shipping address</button></NavLink></div>
                <div><NavLink to="/addresshistory"><button>Address history</button></NavLink></div>
                <div>Total{this.state.total}</div>

            </div>
        );
    }
}

const mapToStateToProps = state => {
    const { user } = state;
    return {
        user
    }
}

export default connect(mapToStateToProps, { inputAddress })(Cart);