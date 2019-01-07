import React, { Component } from 'react';
import "./Cart.css";
import {connect} from 'react-redux';


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }

   
    render() { 
        // console.log("this.props", this.props.user.cart)
           const{cart}= this.props.user
        const cartItems = this.props.user.cart.map(item=>{
            return(
                <div className="cartCard">
                <div><img src={item.image} alt="photo"/></div>
                <div>Name:{item.name}</div>
                <div>Quantity</div>
                <div>Price:{item.price}</div>
                </div>
            )
        })
        return ( 

        <div className="cart">{cartItems}</div>
         );
    }
}

const mapToStateToProps= state =>{
   const {user}= state;
   return {
       user
   } 
}
 
export default connect(mapToStateToProps)(Cart);