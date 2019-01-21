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
      name: "",
      address: "",
      city: "",
      state: "",
      zip: "",
      primary_address: ""

    };
  }

  postInputAddress = event => {
    //   console.log("event", event.target.value)
    this.setState({
      [event.target.name]: event.target.value
    });
  };
  postAddress = () => {
    const { name, address, city, state, zip, primary_address } = this.state;
    const { auth0_id, username } = this.props.user
    const postnewAddress = {
      address,
      city,
      state,
      zip,
      auth0_id,
      username,
      name,
      primary_address



    };
    axios.post("/cart/address", postnewAddress).then(response => {
      //     console.log("postnewAddress", postnewAddress)
      //   console.log("addressform", response);
      this.props.inputAddress(response.data);
      console.log("this.props.inputAddress", this.props.inputAddress(response.data))
    });
  };

  render() {
    // console.log("props", this.props.user)
    return (
      <div className="pageform">
        <div className="form">
          <div>{this.props.user && this.props.user.name}</div>
          <div>

            <h2>Shipping Address</h2>
            <div> Name:<input className="name"
              value={this.state.name}
              name="name" placeholder="First & Last Name"
              onChange={e => {
                this.postInputAddress(e);
              }}
            />
              <div>
                {" "}
                Address:{" "}

                <input className="address"
                  value={this.state.address}
                  name="address" placeholder="Street Address"
                  onChange={e => {
                    this.postInputAddress(e);
                  }}
                />

              </div>
            </div>
            <div>
              <div>
                {" "}
                City:{" "}
                <input className="city"
                  value={this.state.city}
                  name="city" placeholder="City"
                  onChange={e => {
                    this.postInputAddress(e);
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                {" "}
                State:{" "}
                <input className="state"
                  value={this.state.state}
                  name="state" placeholder="State"
                  onChange={e => {
                    this.postInputAddress(e);
                  }}
                />
              </div>
            </div>
            <div>
              <div>
                Zip:{" "}
                <input className="zip"
                  value={this.state.zip}
                  name="zip" placeholder="Zip Code"
                  onChange={e => {
                    this.postInputAddress(e);
                  }}
                />
              </div>
            </div>
            Primary:
             <input className="primary" value={this.state.primary_address} name="primary_address" placeholder="Yes or No" onChange={e => {
              this.postInputAddress(e);
            }} /></div>
        </div>
        <div>
          <div className="formBoxButton">
            <NavLink to="/store_cart">
              <button className="formbutton" onClick={() => { this.postAddress() }}>Submit</button>
            </NavLink>
          </div>

          <div>
          </div>

        </div>
        <div>
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
