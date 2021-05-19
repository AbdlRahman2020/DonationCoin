
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
import * as Web3 from "web3";
import donationContract from './contract.json'

var fs = require('fs');


// if (typeof web3 !=='undefined')
// {
//     web3 = new Web3(web3.currentProvider);  
// }
// else
//{
const web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) // Run on the Ganache localhost 
//}

//const web3 = require("web3");

// if (typeof window.ethereum !== 'undefined') 
// {
//   web3 = new Web3(window.ethereum);
//   // Request account access
//   await window.ethereum.enable();
// }
const metamaskEnabled = async () => {

if (window.ethereum) {
  await window.ethereum.enable();
  //await window.ethereum.send('eth_requestAccounts');
  //window.web3 = new Web3(window.ethereum);
  web3 = new Web3(window.ethereum);

  return true
  }

 return false

}
// web3.eth.getBalance("0x15683c70965f6a3F6D6683D6263279D52d818318", function (error, wei)
// {
//   var balance = web3.utils.fromWei(wei,'ether');
//   console.log(balance)
// }
// )


web3.eth.defaultAccount = web3.eth.accounts[0]; // set default account to first account in ganache


//var contractJSON = "./contract.json";
//var parsing= JSON.parse(fs.readFileSync(contractJSON));
//var abi_parsed = donationContract.abi

var abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"string","name":"_cause","type":"string"}],"name":"NewCharity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"NewDonation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_userName","type":"string"},{"indexed":false,"internalType":"address","name":"_address","type":"address"}],"name":"NewDonor","type":"event"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"_disapproveCharity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"},{"internalType":"string","name":"_donorName","type":"string"},{"internalType":"string","name":"_message","type":"string"}],"name":"_makeDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_cause","type":"string"},{"internalType":"string","name":"_name","type":"string"}],"name":"_registerCharity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_donorName","type":"string"}],"name":"_registerDonor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"charitiesList","outputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"cause","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isApproved","type":"bool"},{"internalType":"uint256","name":"totalCollected","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"charityType","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donationToDonor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donations","outputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donorDonationCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donors","outputs":[{"internalType":"address","name":"donorAddress","type":"address"},{"internalType":"string","name":"donorName","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donorsList","outputs":[{"internalType":"address","name":"donorAddress","type":"address"},{"internalType":"string","name":"donorName","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_cause","type":"string"}],"name":"getCharityByCause","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getDonation","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_donor","type":"address"}],"name":"getDonationsByDonor","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDonorRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')

var contractAddress = '0xf236F73712F17a5D7c488246Ad4D02929777961e'; // from ganache account

var contract = new web3.eth.Contract(abi,contractAddress);

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
            <Route path="/contact"><Contact /></Route>
            <Route path="/donator" component={DonatorLogin}/>
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
