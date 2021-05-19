import React from 'react'
import index from '../index';
import {useState} from 'react'
import * as Web3 from "web3";

//Check if MetaMask is enabled

//var web3 = new Web3(new Web3.providers.HttpProvider('http://localhost:7545')) // Run on the Ganache localhost 
const web3 = new Web3(window.web3.currentProvider);


const metamaskEnabled = async () => {

if (window.ethereum) {
  
  //web3 = new Web3(window.ethereum);
  await window.ethereum.enable()
  const account = await web3.eth.getAccounts();
  const accountAddress = account[0];
  document.getElementById('wallet').value = accountAddress;
  return true
  }

 return false
 

}



const ConnectMetaMask = async () =>
{
    if (await !metamaskEnabled())
    {
        alert("MetaMask is not enabled. Please enable your MetaMask to connect your wallet")
    }

    console.log("Connetion to MetaMask wallet successful");

    web3.eth.getBalance("0x15683c70965f6a3F6D6683D6263279D52d818318", function (error, wei)
    {
        var balance = web3.utils.fromWei(wei,'ether');
        console.log(balance)
    })
    
    
}

// Contract information

var abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"string","name":"_cause","type":"string"}],"name":"NewCharity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"NewDonation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_userName","type":"string"},{"indexed":false,"internalType":"address","name":"_address","type":"address"}],"name":"NewDonor","type":"event"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"_disapproveCharity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"},{"internalType":"string","name":"_donorName","type":"string"},{"internalType":"string","name":"_message","type":"string"}],"name":"_makeDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_cause","type":"string"},{"internalType":"string","name":"_name","type":"string"}],"name":"_registerCharity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_donorName","type":"string"}],"name":"_registerDonor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"charitiesList","outputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"cause","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isApproved","type":"bool"},{"internalType":"uint256","name":"totalCollected","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"charityType","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donationToDonor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donations","outputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donorDonationCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donors","outputs":[{"internalType":"address","name":"donorAddress","type":"address"},{"internalType":"string","name":"donorName","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donorsList","outputs":[{"internalType":"address","name":"donorAddress","type":"address"},{"internalType":"string","name":"donorName","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_cause","type":"string"}],"name":"getCharityByCause","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getDonation","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_donor","type":"address"}],"name":"getDonationsByDonor","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDonorRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')
var contractAddress = '0xf236F73712F17a5D7c488246Ad4D02929777961e'; // from ganache account
var contract = new web3.eth.Contract(abi,contractAddress);
console.log(contract);

const sendData = async () =>
    {
        var wallet;
        var name;

        wallet = document.getElementById('wallet').value
        name = document.getElementById('name').value

        console.log(wallet)
        console.log(name)
        
        return contract.methods._registerDonor(wallet,name).send({from: wallet});
    }  

const DonatorLogin = () => {
    const [user, setCurrentUser] = useState('');
    const [amount, setAmount] = useState('');
    const submitInput = (e) => {
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
                    <h1 style={{color:"#92eb49", textAlign:"center", minHeight:"10vh", marginTop:"3vh"}}>User  login</h1>
                    <button onClick={ConnectMetaMask}>Connect to MetaMask</button>
                    <input type="text" id="wallet" className="label" value={user}  placeholder="Wallet" onChange={(event) => setCurrentUser(event.target.value)}/>
                    <input type="text" className="label" value={amount}  placeholder="Amount" onChange={(event) => setAmount(event.target.value)}/>
                    <input type="text" id="name" className="label" placeholder="Name"></input>
                    <input type="button"  value="Submit" onClick={sendData} className="submit" />
                    <input type="submit"  value="Enter" className="submit" />
            </form>

            
        </div>
        
    )
}

export default DonatorLogin
