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

    web3.eth.defaultAccount = web3.eth.accounts[3];

    web3.eth.getBalance("0x15683c70965f6a3F6D6683D6263279D52d818318", function (error, wei)
    {
        var balance = web3.utils.fromWei(wei,'ether');
        console.log(balance)
    })
    
    
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
                    <input type="submit"  value="Enter" className="submit" />
            </form>

            
        </div>
        
    )
}

export default DonatorLogin
