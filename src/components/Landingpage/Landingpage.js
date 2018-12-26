import React, { Component } from 'react';
import "./Landingpage.css";
import axios from 'axios';

export default class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            productList:[],

         }
    }

    componentDidMount(){
        this.fetchProducts()
    }
    
    fetchProducts=()=>{
        axios.get('/store/pets').then(response=>{
            console.log("response", response)
            this.setState({
                productList: response.data
            })
            console.log("responsedata", response.data)
        })
    }





    render() { 
        const{productList}= this.state;
        return ( 
            <div className="landingpage">
               <div className="title"><h1>Stella & Toby Pet World</h1></div> 
                <div className="product">   
                  {productList.map(product=>{
                    // console.log("product", product)
                    return <div className="productBox">
                        <img src={product.image}/>
                        <div>{product.name}</div>
                        <div>${product.price}</div>
                        
                        </div>
                })}
                


                </div>
                
            </div>
         );
    }
}

