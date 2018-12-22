import React from 'react'
import {NavLink} from "react-router-dom";
import "./Navigation.css";




const Navigation = () => {
    return ( 
        <div className="navbar">
            <div className="navlinks">
            <div><NavLink to= "/"><button>Home</button></NavLink></div>
            <div><NavLink to="/products"><button>Dogs</button></NavLink></div>
            <div><NavLink to="/products"><button>Cats</button></NavLink></div>
            <div><NavLink to="cart"><button>Cart</button></NavLink></div>
            <div className="logo"/>
    
            <div className="login"><button>Login</button></div>
            </div>
        </div>
     );
}
 
export default Navigation;