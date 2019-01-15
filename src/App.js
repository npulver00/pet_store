import React, { Component } from 'react';
import './App.css';
import './Reset.css';
import Navigation from './components/Navigation/Navigation';
import Landingpage from './components/Landingpage/Landingpage';
import Login from './components/Login/Login';
import Footer from './components/Footer/Footer';
import Products from './components/Products/Products';
import Form from "./components/Form/Form";
import Cart from './components/Cart/Cart';
import { Switch, Route } from "react-router-dom";
import AddressFiles from './components/AddressFiles/AddressFiles';



class App extends Component {
  render() {
    return (
      <div className="App">
        <header>
          <Navigation />

        </header>
        <div className="contentWrapper">
          <Switch>
            <Route path="/cart" component={Cart} />
            <Route path="/products" component={Products} />
            <Route path="/form" component={Form} />
            <Route path="/addresshistory" component={AddressFiles} />
            <Route path="/" component={Landingpage} />
          </Switch>

        </div>
        <Footer />
      </div>
    );
  }
}

export default App;
