import React, { Component } from 'react';
import "./Cart.css";
import {connect} from 'react-redux';
import {NavLink} from "react-router-dom";
import axios from 'axios';
import {inputAddress} from "../../redux/reducer";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            checkoutCart: [],
            quantity: 1,
        }
    }

    componentDidMount(){
        this.getProductInCart()
    }

    getProductInCart=()=>{
        axios.get('/session/cart').then(response=>{
            console.log("getProductSession", response)
            this.setState({
                checkoutCart: response.data

            })
            console.log("checkout", response.data)
        })
    }
    deleteProductfromCart=(id)=>{
        axios.delete(`/store/cart/${id}`).then(response=>{
            console.log("responsehelp", response)
            this.setState({
                checkoutCart: response.data
            })
        })
    }
    handleQuantity=(quantity)=>{
        this.setState({
            quantity
        })

    }

   
    render() { 
        // console.log("this.props", this.props.user.cart)
        //    const{cart}= this.props.user
        // console.log("hunter",this.state.checkoutCart)

        const cartItems = this.state.checkoutCart.map(item=>{
            return(
                <div className="cartCard">
                <div><img src={item.image} alt="photo"/></div>
                <div>Name:{item.name}</div>
                <div>Quantity<input type="number" name="quantity" min="1" max="100" value={this.state.quantity} onChange={e=>{this.handleQuantity(e.target.value)}}/></div>
                <div>Price:{item.price * this.state.quantity}</div>
                <button onClick={()=>this.deleteProductfromCart(item.id)}>Delete</button>
               
                </div>
            )
        })
        return ( 
            <div>
        <div className="cart">{cartItems}</div>
        <div><NavLink to="/form"><button>Shipping address</button></NavLink></div>
        <div><NavLink to="/addresshistory"><button>Address history</button></NavLink></div>
        
        </div>
         );
    }
}

const mapToStateToProps= state =>{
   const {user}= state;
   return {
       user
   } 
}
 
export default connect(mapToStateToProps, {inputAddress})(Cart);