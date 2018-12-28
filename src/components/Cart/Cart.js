import React, { Component } from 'react';
import "./Cart.css";


class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 

            <div className="cart">
                 <div>item</div>
                 <div>price</div>
                 <div>quantity</div>

            </div>
         );
    }
}
 
export default Cart;