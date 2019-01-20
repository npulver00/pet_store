import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import axios from 'axios';
import { setUser } from "../../redux/reducer";
import { connect } from "react-redux";
import styled from 'styled-components';
import pic from '../Image/logosunset.png';

const Logo = styled.img`
    display: block;
    margin-left: 120px;
    padding: 6px;
    width: 120px;
    margin-top: 8px;
    z-index: 9999;
    @media(max-width: 700px){
        display:none       
    }
`;


const NavWrapper = styled.div`
    display: flex;
    justify-content: left;
    width: 100%;
    margin: 0 auto;
    padding: 90px;
`;

const Button = styled.button`
    color: white;
    font-weight: bold;
    letter-spacing: 2px;
    border-radius: 20px 5px 20px 5px;
    margin: 10px 20px 10px 0;
    background-color: #DF744A;
    padding-top: 5px 
    padding-bottom: 5px;
    padding-left: 30px;
    padding-right:30px;
    text-align: center;
    &:hover { background-color:#DCB239;
        border: 1px dotted white;
    }
    float: left;
    box-shadow: 2px 2px 3px white;
    @media(max-width: 700px){
        padding: 10px;  
        margin: 65px;  
      
    }
`;


const TitlePage = styled.h1`
width: 70%;
text-align: center;
margin: 0 auto;
margin-top: -90px;
font-family: "Pacifico", cursive;
font-size: 50px;
@media (max-width: 700px){
    font-size: 22px;
    margin-top: 40px;
}
`;

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: this.props.user,
            toggle: false
        };
    }
    componentDidMount() {
        axios.get("/auth/user-data").then(response => {
            this.props.setUser(response.data);
        });
    }

    login() {
        const redirectUri = encodeURIComponent(window.location.origin + "/auth/callback");
        window.location = `http://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }
    logout = () => {
        axios.post('/auth/logout').then(() => {
            this.setState({
                user: null
            });
            this.props.setUser(null);
        })
    }

    toggler = () => {
        this.setState({
            toggle: !this.state.toggle
        })


    }




    render() {

        return (
            <div>
                <div className="topNav">
                    <div><Logo src={pic}></Logo></div>
                    <div className="title"><TitlePage>Stella & Toby's Pet World</TitlePage></div>
                    <div className="centerPictureName">
                        <div className="user"> {this.props.user ? this.props.user.username : ""} </div>
                        <div className="theuserpicture">
                            <img className="userpicture" alt="" src={this.props.user ? this.props.user.picture : ""} />
                        </div>
                    </div>

                </div>
                <div className="showNavbar">
                    <div className="navbar">
                        <NavWrapper>
                            <div><NavLink exact to="/" ><Button><i class="fas fa-home"></i></Button></NavLink></div>
                            <div><NavLink to="/store_cart"><Button><i class="fas fa-shopping-cart"></i></Button></NavLink></div>
                        </NavWrapper>
                        <div className="centerPictureName">
                            <div className="userinfo">
                                <button className={this.props.user ? "hide" : "login"} onClick={this.login}><i class="fas fa-cat">..</i>Login</button>
                                <button className={this.props.user ? "login" : "hide"} onClick={this.logout}><i class="fas fa-dog">..</i>Logout</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="Dropdownmenu">

                    <div className="menuButton"><button onClick={this.toggler}><i class="fas fa-bars"></i></button></div>
                    <div className={this.state.toggle ? "showDropdown" : "hideDropdown"}>

                        <ul >
                            <li> <NavLink to="/">Home</NavLink></li>
                            <li> <NavLink to="/store_cart">Cart</NavLink></li>
                            <li> <NavLink to="/addresshistory">Address History</NavLink></li>
                            <li> <NavLink to="/Form">Addess Form</NavLink></li>
                            <li className={this.props.user ? "hide" : "login"} onClick={this.login}><i class="fas fa-dog">..</i>Login</li>
                            <li className={this.props.user ? "login" : "hide"} onClick={this.logout}><i class="fas fa-cat">..</i>Logout</li>
                        </ul>

                    </div>
                </div>
            </div>
        );
    }
}
const mapStateToProps = state => {
    return {
        user: state.user
    }

}

export default connect(mapStateToProps, { setUser })(Navigation);

