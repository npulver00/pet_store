import React, { Component } from 'react';
import {NavLink} from "react-router-dom";
import "./Navigation.css";
import axios from 'axios';
import {setUser} from "../../redux/reducer";
import {connect} from "react-redux";


class Navigation extends Component{
    constructor(props) {
        super(props);
        this.state = { 
            user:null
        };
    }
    componentDidMount(){
        axios.get("/auth/user-data").then(response=>{
            this.props.setUser(response.data.user);
            // this.setState({
            //     user:response.data.user
            // })
        });
    }

    login(){
        const redirectUri = encodeURIComponent(window.location.origin + "/auth/callback");
        window.location = `http://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }
    logout=()=>{
        axios.post('/auth/logout').then(()=>{
            this.props.setUser({user:null})
        })
        console.log(this.props.setUser({user:null}) )
    }




    render(){
    return ( 
        <div className="navbar">
            <div className="navlinks">
            <div><NavLink activeClassName="active" exact to= "/" ><button>Home</button></NavLink></div>
            <div><NavLink to="/products"><button>Dogs</button></NavLink></div>
            <div><NavLink to="/products"><button>Cats</button></NavLink></div>
            <div><NavLink to="cart"><button>Cart</button></NavLink></div>
            <div className="logo"/>
    
            <div className="login"><button onClick={this.login}>Login</button></div>
            <div className="login"><button onClick={this.logout}>Logout</button></div>
            <img className="userpicture" key="picture"  src={this.props.user? this.props.user.picture: "" }/>
            <div className="user"> {this.props.user ? this.props.user.name : ""} </div>
            </div>
        </div>
     );
    }
}
const mapStateToProps = state => {
    return{
        user: state.user
    }

}

export default connect(mapStateToProps, {setUser})(Navigation);

