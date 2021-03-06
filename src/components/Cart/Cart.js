import React, { Component } from 'react';
import "./Cart.css";
import { connect } from 'react-redux';
import { NavLink, withRouter } from "react-router-dom";
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
            amount: [],
            primaryAddress: [],
            UserAddress: []

        }
    }

    componentDidMount() {
        this.getProductInCart()
        this.amountfromcart()
        this.totalfromcart()
        this.getUsersAddressestoCart()


    }

    getProductInCart = () => {
        this.props.user ?
            axios.get(`/store/cart/${this.props.user.auth0_id}`).then(response => {
                this.setState({
                    checkoutCart: response.data,
                })
            }) : alert("~PLEASE LOGIN FIRST~")
    }
    deleteProductfromCart = (product_id, quantity) => {

        axios.delete(`/store/cart/${product_id}/${quantity}`).then(response => {
            this.getProductInCart()
            this.amountfromcart()
            this.totalfromcart()
        })
    }
    totalfromcart = () => {

        axios.get('/store/cart').then(response => {
            this.setState({
                total: response.data[0].sum
            })
            console.log("totalfromcart", this.state.total)
            console.log("totalfromcart", response)
        })
    }

    amountfromcart = () => {

        axios.get('/store/amount').then(response => {
            this.setState({
                amount: response.data[0].sum
            })
            console.log("amount", this.state.amount)
        })
    }
    ontoken = (token) => {
        const { total } = this.state
        axios.post("/stripe", { token, total }).then(response => alert("Successful payment"))
    }

    postProductToCart = (product_id, price) => {
        const carttoDB = {
            auth0_id: this.props.user.auth0_id,
            product_id: product_id,
            price: price

        }


        axios.post("/store/cart", carttoDB).then(response => {
            console.log('item successfully added to db Natalie', response)
            this.getProductInCart()
            this.amountfromcart()
            this.totalfromcart()
        });

    };

    getUsersAddressestoCart = () => {
        axios.get('/store/addresshistory').then(response => {
            this.setState({
                UserAddress: response.data
            });
            this.postprimarytocart()
        });
    };

    postprimarytocart = () => {
        const { UserAddress } = this.state
        UserAddress.filter(e => {
            if (e.primary_address) {
                let newprimary = this.state.primaryAddress.slice()
                newprimary.push(e)
                this.setState({
                    primaryAddress: newprimary
                })
            }
        })

    }


    render() {

        const { total } = this.state
        console.log("total", total)

        const cartItems = this.state.checkoutCart.map(item => {
            return (
                <div className="cartCard">
                    <div><img src={item.image} key="photo" alt="" /></div>
                    <div>Name:{item.name}</div>
                    <div>Quantity:{item.quantity}</div>
                    <button className="qty" onClick={() => { this.postProductToCart(item.product_id, item.productprice) }}><i class="fas fa-arrow-up"></i></button>
                    <button className="qty" onClick={() => this.deleteProductfromCart(item.product_id, item.quantity)}><i class="fas fa-arrow-down"></i></button>
                    <div>Price: ${Number(item.totalprice).toFixed(2)}</div>
                    <button className="deleteButton" onClick={() => this.deleteProductfromCart(item.product_id, item.quantity)}><i class="fas fa-trash-alt"></i></button>

                </div >
            )
        })

        return (


            //  !this.props.user.auth0_id ?
            //     <div> {this.props.history.push("/")}{alert("~PLEASE LOGIN FIRST~")} </div >
            <div>
                <div className="cart">{this.props.user ? cartItems : this.props.history.push("/")}</div>

                <div className="cartbutton"><NavLink to="/form"><button>Add Shipping address</button></NavLink></div>
                <div className="cartbutton"><NavLink to="/addresshistory"><button>Address history</button></NavLink></div>
                <div className="totalAddress">
                    <div className="primaryAddCart">
                        <h3>Use this Address</h3>
                        <div>{this.state.primaryAddress.length > 0 && this.state.primaryAddress[0].name}</div>
                        <div>{this.state.primaryAddress.length > 0 && this.state.primaryAddress[0].address}</div>
                        <div>{this.state.primaryAddress.length > 0 && this.state.primaryAddress[0].city}</div>
                        <div>{this.state.primaryAddress.length > 0 && this.state.primaryAddress[0].state}</div>
                        <div>{this.state.primaryAddress.length > 0 && this.state.primaryAddress[0].zip}</div>
                    </div>
                    <div className="totalbox">
                        <div className="total">Amount: ${this.state.amount}</div>
                        <div className="total">Tax: ${(this.state.total - this.state.amount).toFixed(2)} </div>
                        <div className="total">Total: ${this.state.total}</div>
                        <div className="total">Shipping: Free! </div>
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
                </div>

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