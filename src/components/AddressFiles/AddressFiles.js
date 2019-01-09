import React, { Component } from 'react';
import "./AddressFiles.css";
import axios from "axios";


class AddressFiles extends Component {
    constructor(props) {
        super(props);
        this.state = {
            addresses: []
          }
    }
    componentDidMount(){
        this.getUsersAddresses()
    }

    getUsersAddresses=()=>{
        axios.get('/store/addresshistory').then(response=>{
            console.log("responseGetUser", response)
            this.setState({
                addresses: response.data
            })

        })
    }


    render() { 
        const{addresses}= this.state
         const useraddresses= addresses.map(shipping=>{
       
        return ( 
            <div className="files">
                <div>{shipping.name}</div>
                <div>{shipping.address}</div>
                <div>{shipping.city}</div>
                <div>{shipping.state}</div>
                <div>{shipping.zip}</div>
                <button>Edit</button>
                <button>Delete</button>



            </div>
         );
        })

        return(
            <div>{useraddresses}</div>
        )
    }
}
 
export default AddressFiles;