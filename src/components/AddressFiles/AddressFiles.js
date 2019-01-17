import React, { Component } from "react";
import "./AddressFiles.css";
import axios from "axios";
import { connect } from "react-redux";
import { inputAddress } from "../../redux/reducer";
import styled from 'styled-components';
import { NavLink } from "react-router-dom";

const AddressWrapper = styled.div`
background-color: #DCB239;
border: solid black 2px;
padding: 50px;
height: 200px;
width: 300px;
display: inline-block;
margin: 20px;
text-align: center;
border-radius: 10px;
margin-left: 100px;
letter-spacing: 1px;
font-size: 20px;
color: black;
font-weight: 500;
`;




const Submit = styled.div`
  margin: 10px;
  height: 100px;
`;




class AddressFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      isHidden: false,

    };
  }
  componentDidMount() {
    this.getUsersAddresses();
  }


  getUsersAddresses = () => {
    axios.get('/store/addresshistory').then(response => {
      console.log("responseGetUser", response);
      this.setState({
        addresses: response.data
      });
    });

  };
  editAddress = id => {
    const { addresses } = this.state
    const edituserAddress = addresses.find(address => address.id == id)
    // console.log("addresses help", addresses)
    // console.log("edituserAddress", edituserAddress);

    axios.put(`/store/addresshistory/${id}`, edituserAddress).then(() => {
      // console.log("put response.data", response);
      this.getUsersAddresses();
    });
  };
  deleteAddress = id => {
    axios.delete(`/store/addresshistory/${id}`).then(response => {
      this.setState({
        addresses: response.data
      });
      this.getUsersAddresses();
    });
  };

  handleNestedChange = (event, index) => {
    const newInput = [...this.state.addresses];
    newInput[index][event.target.name] = event.target.value;

    this.setState({
      addresses: newInput
    });
  };

  submitAddress = () => {
    this.state.isHidden
      ? this.setState({
        isHidden: false
      })
      : this.setState({
        isHidden: true
      });
    console.log(this.state.isHidden);
  };

  render() {
    const { addresses } = this.state;
    console.log("this.state", this.state);
    const useraddresses = addresses.map((shipping, index) => {
      return (
        <AddressWrapper>
          {this.state.isHidden ? (
            <div className="inputAd">
              <div>
                <input value={shipping.name} name="name" onChange={e => {
                  this.handleNestedChange(e, index);
                }} />
              </div>
              <div>
                <input value={shipping.address} name="address" onChange={e => {
                  this.handleNestedChange(e, index);
                }} />
              </div>
              <div>
                <input value={shipping.city} name="city" onChange={e => {
                  this.handleNestedChange(e, index);
                }} />
              </div>
              <div>
                <input value={shipping.state} name="state" onChange={e => {
                  this.handleNestedChange(e, index);
                }} />
              </div>
              <div>
                <input value={shipping.zip} name="zip" onChange={e => {
                  this.handleNestedChange(e, index);
                }} />
              </div>
            </div>
          ) : (
              <Submit>
                <div>{shipping.name}</div>
                <div>{shipping.address}</div>
                <div>{shipping.city}</div>
                <div>{shipping.state}</div>
                <div>{shipping.zip}</div>
              </Submit>
            )}

          <NavLink to="/cart"><button className="addressbutton"
            onClick={() => {
              this.editAddress(shipping.id);
            }}
          >
            Back to Cart
          </button>
          </NavLink>

          <div className="editbutton">
            <button className={this.state.isHidden ? "hide" : "edit"} onClick={this.submitAddress}> Edit Address </button>
            <button className={this.state.isHidden ? "edit" : "hide"} onClick={this.submitAddress}> Save Address </button>
          </div>
          <button className="addressbutton"
            onClick={() => {
              this.deleteAddress(shipping.id);
            }}
          >
            Delete
          </button>

        </AddressWrapper >
      );
    });

    return (
      <div>
        <div>{this.props.user.auth0_id ? useraddresses : ""}</div>
        {/* <input onChange={this.handleInput}/> */}
      </div >
    );
  }
}
const mapToStateToProps = state => {
  const { user } = state;
  return {
    user
  };
};

export default connect(
  mapToStateToProps,
  { inputAddress }
)(AddressFiles);
