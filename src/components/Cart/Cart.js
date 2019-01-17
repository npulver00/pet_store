import React, { Component } from 'react';
import "./Cart.css";
import { connect } from 'react-redux';
import { NavLink, withRouter } from "react-router-dom";
import { Redirect } from "react-router";
import axios from 'axios';
import { inputAddress } from "../../redux/reducer";
// import Stripecheckout from "../Stripecheckout/Stripecheckout";
import Stripecheckout from 'react-stripe-checkout';




class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {
            checkoutCart: [],
            total: [],
            amount: []

        }
    }

    componentDidMount() {
        this.getProductInCart()
        this.amountfromcart()
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

        // console.log("id front", product_id)
        axios.delete(`/store/cart/${product_id}/${quantity}`).then(response => {
            // console.log("Delete Cart Front", response)
            // this.setState({
            //     checkoutCart: response.data
            // })
            this.getProductInCart()
            this.amountfromcart()
            this.totalfromcart()
        })
    }
    totalfromcart = () => {

        axios.get('/store/cart').then(response => {
            // console.log("totalcart", response)
            this.setState({
                total: response.data[0].sum
            })
        })
    }

    amountfromcart = () => {

        axios.get('/store/amount').then(response => {
            // console.log("amountcart", response)
            this.setState({
                amount: response.data[0].sum
            })
        })
    }
    ontoken = (token) => {
        const { total } = this.state
        axios.post("/stripe", { token, total })
            .then(response => alert("Successful payment"))
    }
    postProductToCart = (product_id, price) => {
        const carttoDB = {
            auth0_id: this.props.user.auth0_id,
            product_id: product_id,
            price: price

        }
        // console.log("carttooooo!!!", this.props.user)
        console.log("cart***", carttoDB)


        axios.post("/store/cart", carttoDB).then(response => {
            // console.log("response Post", response);
            // console.log("response Post Data", response.data);
            console.log('item successfully added to db Natalie', response)
            this.getProductInCart()
            this.amountfromcart()
            this.totalfromcart()
        });

    };


    render() {
        console.log("checkoutCart!!", this.state.checkoutCart)

        const { total } = this.state

        const cartItems = this.state.checkoutCart.map(item => {
            console.log("cartItems", item)

            return (
                <div className="cartCard">
                    <div><img src={item.image} alt="photo" /></div>
                    <div>Name:{item.name}</div>
                    <div>Quantity:{item.quantity}</div>
                    <button className="qty" onClick={() => { this.postProductToCart(item.product_id, item.productprice) }}>+</button>
                    <button className="qty" onClick={() => this.deleteProductfromCart(item.product_id, item.quantity)}>-</button>
                    <div>Price: ${item.totalprice}</div>
                    <button className="deleteButton" onClick={() => this.deleteProductfromCart(item.product_id, item.quantity)}>Delete</button>

                </div>
            )
        })
        console.log("cartitems0000", this.state.checkoutCart)
        return (


            !this.props.user.auth0_id ?
                // <div>{this.props.history.push("/")}{alert("~PLEASE LOGIN FIRST~")} </div>
                <Redirect to="/" />
                : <div>
                    <div className="cart">{this.props.user.auth0_id ? cartItems : alert("~PLEASE LOGIN FIRST~")}</div>


                    <div className="totalbox">
                        <div>Amount: ${this.state.amount}</div>
                        <div>Tax: ${(this.state.total - this.state.amount).toFixed(2)} </div>
                        <div className="total">Total: ${this.state.total}</div>
                        <div>Shipping: Free! </div>
                        <div className="stripebutton"><Stripecheckout
                            ComponentClass="stripe"
                            name="Stella and Toby's World"
                            // email="test@gmail.com"
                            amount={total * 100}
                            token={this.ontoken}
                            allowRememberMe={false}
                            stripeKey={process.env.REACT_APP_STRIPE_KEY}
                        /></div>
                    </div>
                    <div><NavLink to="/form"><button>Shipping address</button></NavLink></div>
                    <div><NavLink to="/addresshistory"><button>Address history</button></NavLink></div>
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

export default withRouter(connect(mapToStateToProps, { inputAddress })(Cart));