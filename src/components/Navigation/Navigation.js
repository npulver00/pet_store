import React, { Component } from 'react';
import { NavLink } from "react-router-dom";
import "./Navigation.css";
import axios from 'axios';
import { setUser } from "../../redux/reducer";
import { connect } from "react-redux";
import styled from 'styled-components';
import pic from '../Image/logo1.png'

const Logo = styled.img`
    display: block;
    margin-left: 120px;
    padding: 50px;
    width: 120px;
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
    border: 1px solid white;
    margin: 10px 20px 10px 0;
    background-color: gray;
    padding: 5px 30px;
    text-align: center;
    &:hover {
      background-color: black;
      border: 1px solid white;
    }
    float: left;
`;

const UserInfo = styled.div`

    display: inline-block;
    position: absolute;
    right: 80px;
    top: 20px;
    bottom: 10px;
`;

const UserButton = styled(Button)`
    display: inline-block;
     margin-right: 10px;
   
`;

const TitlePage = styled.h1`
width: 70%;
text-align: center;

margin: 0 auto;
margin-top: -120px;

font-family: "Pacifico", cursive;
font-size: 50px;

`;

// const UserPicture = styled.div`
// width: 50px;
// border-radius: 50%;
// border: 2px black;
// padding: 20px;
// font-weight: 500px;

// `;



class Navigation extends Component {
    constructor(props) {
        super(props);
        this.state = {
            user: null,

        };
    }
    componentDidMount() {
        axios.get("/auth/user-data").then(response => {
            // console.log("response in Navigation", response)
            this.props.setUser(response.data);
            // this.setState({
            //     user:response.data.user
            // })
            // console.log(" response.data in Navigation", this.props.setUser(response.data))
        });
    }

    login() {
        const redirectUri = encodeURIComponent(window.location.origin + "/auth/callback");
        window.location = `http://${process.env.REACT_APP_AUTH0_DOMAIN}/authorize?client_id=${process.env.REACT_APP_AUTH0_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }
    logout = () => {
        axios.post('/auth/logout').then(() => {
            this.props.setUser(null)

        })
        console.log(this.props.setUser({ user: null }))
    }




    render() {
        console.log("this.props.user!!!", this.props)
        return (
            <div>
                <div className="topNav">
                    <Logo src={pic}></Logo>
                    <TitlePage>Stella & Toby's Pet World</TitlePage>
                    <div className="theuserpicture">
                        <div className="user"> {this.props.user ? this.props.user.username : ""} </div>
                        <img className="userpicture" key="picture" src={this.props.user ? this.props.user.picture : ""} />
                    </div>


                </div>
                <div className="navbar">
                    <NavWrapper>
                        <div><NavLink activeClassName="active" exact to="/" ><Button>Home</Button></NavLink></div>
                        <div><NavLink to="/products"><Button>Dogs</Button></NavLink></div>
                        <div><NavLink to="/products"><Button>Cats</Button></NavLink></div>
                        <div><NavLink to="cart"><Button>Cart</Button></NavLink></div>
                    </NavWrapper>
                    <UserInfo>
                        <UserButton onClick={this.login}>Login</UserButton>
                        <UserButton onClick={this.logout}>Logout</UserButton>
                    </UserInfo>
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

