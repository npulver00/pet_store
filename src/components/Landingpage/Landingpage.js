import React, { Component } from 'react';
import "./Landingpage.css";
import axios from 'axios';
import {NavLink} from "react-router-dom";
import {connect} from 'react-redux';
import {allProducts,removeCart, addCart} from "../../redux/reducer";

 class Landingpage extends Component {
    constructor(props) {
        super(props);
        
    }

    componentDidMount(){
        this.fetchProducts()
    }
    
    fetchProducts=()=>{
        axios.get('/store/pets').then(response=>{
            // console.log("response", response)
            this.props.allProducts(response.data)
            // console.log("responsedata", response.data)
        })
    }
    // postProductToCart=()=>{
    //     axios.post('/store/pets').then(response=>{
    //         console.log("response Post", response)
    //         console.log("response Post Data", response.data)
    //         this.setState({
    //             cartItem: response.data,
    //             name:"hello"
                           
    //         })
    //     })

    // }
    // removeCart, addCart





    render() { 
        const{productList}= this.props
        
        const listItems= productList.map(product=>{
            return  <div className="productBox">
                <div><img src={product.image} alt="productimage"/></div>
                <div>{product.name}</div>
                <div>${product.price}</div>
            <NavLink to="/cart"> <div><button onClick={()=>{this.postProductToCart()}}>Add to Cart</button></div></NavLink></div>
        });
    return ( 
        <div className="landingpage">
            <div className="title"><h1>Stella & Toby Pet World</h1></div> 
                <div className="product">     
                {listItems}
            </div>
        </div>
        );
}
}


const mapStateToProps = state =>{
    const{productList}= state;
    return{
        productList
    }
}
export default connect(mapStateToProps, {allProducts,removeCart, addCart})(Landingpage);

