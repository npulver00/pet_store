import React, { Component } from "react";
import "./Form.css";
import { connect } from "react-redux";
import { NavLink } from "react-router-dom";
import { inputAddress } from "../../redux/reducer";
import axios from "axios";

class Form extends Component {
  constructor(props) {
    super(props);
    this.state = {
      address: "",
      city: "",
      state: "",
      zip: "",
    
    };
  }

  postInputAddress = event => {
    //   console.log("event", event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  postAddress = () => {
    const { address, city, state, zip } = this.state;
    const{auth0_id, name}=this.props.user
    const postnewAddress = {
        address,
        city,
        state,
        zip,
        auth0_id,
        name


    };
    axios.post("/cart/address", postnewAddress).then(response => {
    //     console.log("postnewAddress", postnewAddress)
    //   console.log("addressform", response);
      this.props.inputAddress(response.data);
      console.log("this.props.inputAddress",  this.props.inputAddress(response.data) )
    });
  };

  render() {
      console.log("props", this.props.user)
    return (
      <div className="form">
        <div>{this.props.user && this.props.user.name}</div>
        <div>
          Shipping Address
          <div>
            <div>
              {" "}
              Address{" "}
              <input
                value={this.state.address}
                name="address"
                onChange={e => {
                  this.postInputAddress(e);
                }}
              />
            </div>
          </div>
          <div>
            <div>
              {" "}
              City{" "}
              <input
                value={this.state.city}
                name="city"
                onChange={e => {
                  this.postInputAddress(e);
                }}
              />
            </div>
          </div>
          <div>
            <div>
              {" "}
              State{" "}
              <input
                value={this.state.state}
                name="state"
                onChange={e => {
                  this.postInputAddress(e);
                }}
              />
            </div>
          </div>
          <div>
            <div>
              Zip{" "}
              <input
                value={this.state.zip}
                name="zip"
                onChange={e => {
                  this.postInputAddress(e);
                }}
              />
            </div>
          </div>
        </div>
       
        <div>
          <div>
              <button onClick={()=>{this.postAddress()}}>Submit</button>
            <NavLink to="/Cart">
            </NavLink>
          </div>
         
         
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    user: state.user,
    input: state.input
  };
};

export default connect(
  mapStateToProps,
  { inputAddress }
)(Form);
