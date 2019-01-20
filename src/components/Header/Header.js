import React from 'react'
import styled from 'styled-components';
import "./Header.css"



const Title = styled.h2`
margin: 0 auto;
height: 100px;
width: 100%;
text-align: center;
@media:(max-width:411px){
    display:none
}

:`


const Header = () => {
    return (
        <Title>
            <h2>Address History</h2>
        </Title>
    );
}

export default Header;