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
    padding: 5px 30px;
    text-align: center;
    &:hover { background-color:#DCB239;
        border: 1px dotted white;
    }
    float: left;
    box-shadow: 2px 2px 3px white;
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
margin-top: -90px;
font-family: "Pacifico", cursive;
font-size: 50px;

`;




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

