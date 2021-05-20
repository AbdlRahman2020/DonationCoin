
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useState } from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Logins from './components/Logins';
import About from './components/About';
import Category from './components/Category';
import Projects from './components/Projects';
import Searchbar from './components/SearchBar';
import NavBar from './components/NavBar'
import Contact from './components/Contact'
import DonatorLogin from './components/DonatorLogin'
import CharitySignup from './components/CharitySignup'
import Table from './components/Table'
import * as Web3 from "web3";
import {abi} from './ContractData.js';
import {contractAddress} from './ContractData.js'
var fs = require('fs');


var web3 = new Web3(window.web3.currentProvider); // Run on the Ganache localhost

const metamaskEnabled = async () => {
  if (window.ethereum) {
      await window.ethereum.enable()
      web3 = new Web3(window.ethereum);
      return true
  }

  
  return false
}

web3.eth.defaultAccount = web3.eth.accounts[0]; // set default account to first account in ganache

var contract = new web3.eth.Contract(abi, contractAddress);
console.log(contract);

const Homepage = () => {

  const [currentCat, setCurrentCat] = useState("");
  const [currentUser, setCurrentUser] = useState("") // currentUser should be a wallet which asks permission to connect to blockchain
  const [amount, setAmount] = useState(0) // the amount wants to donate to which one category

  return (
    <Router history={Router}>
      <div className="container">
        <Header />
        <NavBar />
        <div className="content">
          <Switch>
            <Route exact path="/"><Logins /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/browse"><Category setCurrentCat={setCurrentCat} /><Projects currentCat={currentCat} /></Route>
            <Route path="/track"><Searchbar /></Route>
            <Route path="/table"><Table /></Route>
            <Route path="/contact"><Contact /></Route>
            <Route path="/donator" component={DonatorLogin} />
            <Route path="/"><CharitySignup /></Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

// ========================================

ReactDOM.render(
  <Homepage />,
  document.getElementById('root'),
);
