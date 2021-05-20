import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import * as Web3 from "web3";
import $ from 'jquery';

// Checking MetaMask

const web3 = new Web3(window.web3.currentProvider);

const metamaskEnabled = async () => {
if (window.ethereum) {
  await window.ethereum.enable()
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
    const account = await web3.eth.getAccounts();
    const accountAddress = account[0];
    document.getElementById('wallet').value = accountAddress;
    console.log("Connetion to MetaMask wallet successful");
}



// Contract information

var abi = JSON.parse('[{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"_disapproveCharity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"},{"internalType":"string","name":"_donorName","type":"string"},{"internalType":"string","name":"_message","type":"string"}],"name":"_makeDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_cause","type":"string"},{"internalType":"string","name":"_name","type":"string"}],"name":"_registerCharity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_donorName","type":"string"}],"name":"_registerDonor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"string","name":"_cause","type":"string"}],"name":"NewCharity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"},{"indexed":false,"internalType":"string","name":"message","type":"string"}],"name":"NewDonation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_userName","type":"string"},{"indexed":false,"internalType":"address","name":"_address","type":"address"}],"name":"NewDonor","type":"event"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"charitiesList","outputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"cause","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isApproved","type":"bool"},{"internalType":"uint256","name":"totalCollected","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"charityType","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donations","outputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donationToDonor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donorDonationCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donors","outputs":[{"internalType":"address","name":"donorAddress","type":"address"},{"internalType":"string","name":"donorName","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donorsList","outputs":[{"internalType":"address","name":"donorAddress","type":"address"},{"internalType":"string","name":"donorName","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_cause","type":"string"}],"name":"getCharityByCause","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getDonation","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_donor","type":"address"}],"name":"getDonationsByDonor","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDonorRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')
var contractAddress = '0x05B6463706046ADDC673f73C63c8Ca27F558c496'; // from ganache account
var contract = new web3.eth.Contract(abi,contractAddress);
console.log(contract);

// 

const sendData = async () =>
    {
        var wallet;
        var cause;
        var name;

        wallet = document.getElementById('wallet').value
        cause = document.getElementById('cause').value
        name = document.getElementById('name').value

        console.log(wallet)
        console.log(cause)
        console.log(name)
        
        return contract.methods._registerCharity(wallet,cause,name).send({from: wallet});
    }  


const CharitySignup = () => {
    const [wallet, setWallet] = useState('');
    // const [password, setPassword] = useState('');
    const history = useHistory();
    const [success, setSuccess] = useState(false);
  

    const submitInput = async (e) => {
        //if not deplicated  and -> success otherwise fail
        // verify the owner
        e.preventDefault()
        // if create a new organization, then  add it to Category.js
    }

    

    return (
        <div >
                    <form action="" className="labelinput" onSubmit={(e) => submitInput(e)}>
                    <h3 style={{color:"#92eb49", textAlign:"center", minHeight:"10vh", marginTop:"3vh"}}>Charity registration</h3>
                    <button onClick={ConnectMetaMask}>Connect to MetaMask</button>
                    <input type="text" id="wallet" className="label" placeholder="Wallet Address"/>
                    <input type="text" id="cause" className="label" placeholder="Cause"></input>
                    <input type="text" id="name" className="label" placeholder="Name"></input>
                    <input type="button"  value="Submit" onClick={sendData} className="submit" />
                    <input type="submit"  value="Enter" className="submit" />
                    

                    </form>
        </div>
    )
}

export  default CharitySignup
