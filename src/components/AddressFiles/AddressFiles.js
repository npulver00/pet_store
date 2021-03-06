import React, { Component } from "react";
import "./AddressFiles.css";
import axios from "axios";
import { connect } from "react-redux";
import { inputAddress } from "../../redux/reducer";
import styled from 'styled-components';
import Header from "../Header/Header";
import { withRouter } from "react-router-dom";

const AddressWrapper = styled.div`
background-color: #DCB239;
border: solid black 2px;
padding: 70px;
height: 250px;
width: 300px;
display: inline-block;
margin: 20px;
text-align: center;
border-radius: 10px;
margin-left: 90px;
letter-spacing: 2px;
font-size: 20px;
color: black;
font-weight: 500;
margin-top: 50px;
@media(max-width: 700px){
  width: 61vw;
  margin: 0 auto;

}
`;




const Submit = styled.div`
display: flex;
justify-content: center;
align-content: center;
flex-direction: column;
text-align: center
font-weight: bold;
height: 200px;
@media(max-width: 700px){
 margin: 0 auto;
 width: 65vw;
}

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
      this.setState({
        addresses: response.data
      });
    });

  };
  editAddress = id => {
    const { addresses } = this.state
    const edituserAddress = addresses.find(address => address.id === id)
    if (this.state.addresses.filter(address => address.primary_address).length > 1) {
      alert('You can only have one primary address!')
    } else {
      axios.put(`/store/addresshistory/${id}`, edituserAddress).then(() => {
        this.getUsersAddresses();
      });
    }
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
    if (this.state.addresses.filter(address => address.primary_address).length > 1) {
      alert('You can only have one primary address!')
    } else {
      this.state.isHidden
        ? this.setState({
          isHidden: false
        })
        : this.setState({
          isHidden: true
        });
    }
  };

  onClick = (id) => {
    console.log(id)
    this.submitAddress()
    this.editAddress(id)
  }



  render() {
    const { addresses } = this.state;
    const useraddresses = addresses.map((shipping, index) => {
      return (<AddressWrapper>
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
            <div>
              <input value={shipping.primary_address} name="primary_address" onChange={e => {
                this.handleNestedChange(e, index);
              }} />
            </div>
          </div>
        ) : (

            <Submit>
              <div className="divide">
                <div>{shipping.name}</div>
                <div>{shipping.address}</div>
                <div>{shipping.city}</div>
                <div>{shipping.state}</div>
                <div>{shipping.zip}</div>
                <div>{shipping.primary_address && 'PRIMARY ADDRESS'}</div>
              </div>
            </Submit>
          )}

        <div className="editbutton">
          <button className={this.state.isHidden ? "hide" : "edit"} onClick={this.submitAddress}> Edit Address </button>
          <button className={this.state.isHidden ? "edit" : "hide"} onClick={() => this.onClick(shipping.id)} > Save Address </button>
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
        <div> <Header /></div>
        <div>{this.props.user ? useraddresses : this.props.history.push("/")}</div>
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

export default withRouter(connect(mapToStateToProps, { inputAddress })(AddressFiles));
