import React, { Component } from "react";
import "./AddressFiles.css";
import axios from "axios";
import { connect } from "react-redux";
import { inputAddress } from "../../redux/reducer";
import { EventEmitter } from "events";

class AddressFiles extends Component {
  constructor(props) {
    super(props);
    this.state = {
      addresses: [],
      // address: "",
      // city: "",
      // state: "",
      // zip: "",
      // name: "",
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
        <div className="files">
          {this.state.isHidden ? (
            <div>
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
              <div>
                <div>{shipping.name}</div>
                <div>{shipping.address}</div>
                <div>{shipping.city}</div>
                <div>{shipping.state}</div>
                <div>{shipping.zip}</div>
              </div>
            )}
          <button
            onClick={() => {
              this.editAddress(shipping.id);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              this.deleteAddress(shipping.id);
            }}
          >
            Delete
          </button>
          <div>
            <button onClick={this.submitAddress}>Submit Change</button>
          </div>
        </div>
      );
    });

    return (
      <div>
        <div>{this.props.user.auth0_id ? useraddresses : ""}</div>
        {/* <input onChange={this.handleInput}/> */}
      </div>
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
