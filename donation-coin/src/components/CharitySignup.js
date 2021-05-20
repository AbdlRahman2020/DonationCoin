import { useState } from 'react'
import { useHistory, Link } from 'react-router-dom'
import * as Web3 from "web3";
import $ from 'jquery';
import { abi } from '../ContractData.js';
import { contractAddress } from '../ContractData.js'

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

// 
const sendData = async () => {
    var wallet;
    var charityAddress;
    var cause;
    var name;

    const account = await web3.eth.getAccounts();
    const accountAddress = account[0];

    wallet = accountAddress;

    contract.methods.owner().call({ from: wallet }).then(function (returnOwnerAddress) {

        if (returnOwnerAddress != wallet) {
            alert("You are not eligible to register your charity. Please contact us to get verified.")
        }

    });

    charityAddress = document.getElementById('charityAddress').value
    cause = document.getElementById('cause').value
    name = document.getElementById('name').value

    console.log(wallet)
    console.log(cause)
    console.log(name)

    return contract.methods._registerCharity(charityAddress, cause, name).send({ from: wallet });
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

        <div>
            <p id="explaining">Please note that only authenticated users can register a charity.</p>
            <form action="" className="labelinput" onSubmit={(e) => submitInput(e)}>
                <h3 style={{ color: "#92eb49", textAlign: "center", minHeight: "10vh", marginTop: "3vh" }}>Charity registration</h3>
                <button className="connectMetaMask" onClick={ConnectMetaMask}>Connect to MetaMask</button>
                <input type="text" id="charityAddress" className="label" placeholder="Wallet Address" />
                <input type="text" id="cause" className="label" placeholder="Cause"></input>
                <input type="text" id="name" className="label" placeholder="Name"></input>
                <input type="button" value="Register" onClick={sendData} className="submit" />

            </form>
        </div>
    )
}

export default CharitySignup
