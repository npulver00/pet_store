import React, { Component } from 'react';
import './App.css';
import './Reset.css';
import Navigation from './components/Navigation/Navigation';
import Landingpage from './components/Landingpage/Landingpage';
import Login from './components/Login/Login';
// import Footer from './components/Footer/Footer';
import Products from './components/Products/Products';
import Cart from './components/Cart/Cart';
import {Switch, Route} from "react-router-dom";


class App extends Component {
  render() {
    return (
      <div className="App">
        <Navigation/>
        <Login/>
  
       <Switch>
         <Route path="/cart" component={Cart}/>
         <Route path="/products" component={Products} />
         <Route path="/" component={Landingpage}/> 
       </Switch>

       





      
       
      
       {/* <div><Footer/></div> */}
      </div>
    );
  }
}

export default App;
