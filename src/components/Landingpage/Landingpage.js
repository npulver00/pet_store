import React, { Component } from 'react';
import "./Landingpage.css";

export default class Landingpage extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
    }
    render() { 
        return ( 
            <div className="landingpage">
               <div className="title"><h1>Stella & Toby Pet World</h1></div> 
                <div className="product">   
                    <span>box1</span>
                    <span>box2</span> 
                    <span>box3</span>
                    <span>box4</span>
                    <span>box5</span>
                    


                </div>
                
            </div>
         );
    }
}
 
