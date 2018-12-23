import React, { Component } from 'react';
import axios from 'axios';


export default class Login extends Component {
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




    render() { 
        return ( 
            <div className="Login Section">
            <img className="user" src={this.state.user? this.state.user.picture: ""}/>
          <div className="user"> {this.state.user ? this.state.user.name : ""} </div>
                <button onClick={this.login}>Login</button>

            </div>
        );
    }
}

