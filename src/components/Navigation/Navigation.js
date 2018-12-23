import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import "./Navigation.css";
import axios from 'axios';




export default class Navigation extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            user:null
        };
    }
    componentDidMount(){
        axios.get("/auth/user-data").then(response=>{
            this.setState({
                user:response.data.user
            })
        });
    }

    login(){
        const redirectUri = encodeURIComponent(window.location.origin + "/auth/callback");
        window.location = `http://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }




    render(){
    return ( 
        <div className="navbar">
            <div className="navlinks">
            <div><NavLink to= "/"><button>Home</button></NavLink></div>
            <div><NavLink to="/products"><button>Dogs</button></NavLink></div>
            <div><NavLink to="/products"><button>Cats</button></NavLink></div>
            <div><NavLink to="cart"><button>Cart</button></NavLink></div>
            <div className="logo"/>
    
            <div className="login"><button onClick={this.login}>Login</button></div>
            <img className="userpicture" src={this.state.user? this.state.user.picture: ""}/>
            <div className="user"> {this.state.user ? this.state.user.name : ""} </div>
            </div>
        </div>
     );
    }
}
 
