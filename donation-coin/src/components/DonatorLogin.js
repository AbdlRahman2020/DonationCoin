import React from 'react'
import index from '../index';
import { useState } from 'react'
import * as Web3 from "web3";
import {abi} from '../ContractData.js';
import {contractAddress} from '../ContractData.js'

// Checking MetaMask

var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545'))

const metamaskEnabled = async () => {
    if (window.ethereum) {
        await window.ethereum.enable()
        web3 = new Web3(window.ethereum);
        return true
    }
    return false
}

const ConnectMetaMask = async () => {
    if (await !metamaskEnabled()) {
        alert("MetaMask is not enabled. Please enable your MetaMask to connect your wallet")
    }
    console.log("Connetion to MetaMask wallet successful");
}

// Contract information
var contract = new web3.eth.Contract(abi, contractAddress);
console.log(contract);

// Donation function

const makeDonation = async () => {
    var wallet;
    var amountWei;
    var amountEther;
    var charityAddress;
    var name;
    var message;

    const account = await web3.eth.getAccounts();
    const accountAddress = account[0];

    wallet = accountAddress;
    charityAddress = document.getElementById('charityAddress').value
    amountWei = document.getElementById('amt').value
    name = document.getElementById('name').value
    message = document.getElementById('message').value

    amountEther = web3.utils.toWei(amountWei, 'ether')

    return contract.methods._makeDonation(charityAddress, name, message).send({ from: wallet, value: amountEther });
}


const DonatorLogin = () => {
    const [user, setCurrentUser] = useState('');
    const [amount, setAmount] = useState('');


    const submitInput = async (e) => {
        e.preventDefault()
        console.log(user)
        console.log(amount)

        //use  user as wallet and amount as money the user wants to donate
        //implement a function to ask for pessmission and if permit then check if the amount of money in his wallet can afford that transcation, if can, then 
        // transcation, use home nva to return 

        //log in is not real log in, instead it web3 injection to force transcation. if successful, store it to transcations
    }
    return (

        <div>


            <form action="" className="labelinput" onSubmit={(e) => submitInput(e)}>
                <h1 style={{ color: "#92eb49", textAlign: "center" }}>User  login</h1>
                <button className="connectMetaMask" onClick={ConnectMetaMask}>Connect to MetaMask</button>
                <input type="text" id="charityAddress" className="label" placeholder="Charity Wallet Address" />
                <input type="text" id="amt" className="label" placeholder="Amount in Ether" />
                <input type="text" id="name" className="label" placeholder="Your Name" />
                <input type="text" className="label" id="message" placeholder="Message" />
                <input type="button" value="Send" onClick={makeDonation} className="submit" />
            </form>


        </div>

    )
}

export default DonatorLogin
