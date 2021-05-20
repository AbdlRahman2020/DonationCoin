import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import * as Web3 from "web3";
import $ from 'jquery';


const web3 = new Web3(window.web3.currentProvider);
var abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"string","name":"_cause","type":"string"}],"name":"NewCharity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"NewDonation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_userName","type":"string"},{"indexed":false,"internalType":"address","name":"_address","type":"address"}],"name":"NewDonor","type":"event"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"_disapproveCharity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"},{"internalType":"string","name":"_donorName","type":"string"},{"internalType":"string","name":"_message","type":"string"}],"name":"_makeDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_cause","type":"string"},{"internalType":"string","name":"_name","type":"string"}],"name":"_registerCharity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_donorName","type":"string"}],"name":"_registerDonor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"charitiesList","outputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"cause","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isApproved","type":"bool"},{"internalType":"uint256","name":"totalCollected","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"charityType","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donationToDonor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donations","outputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donorDonationCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donors","outputs":[{"internalType":"address","name":"donorAddress","type":"address"},{"internalType":"string","name":"donorName","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donorsList","outputs":[{"internalType":"address","name":"donorAddress","type":"address"},{"internalType":"string","name":"donorName","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_cause","type":"string"}],"name":"getCharityByCause","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getDonation","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_donor","type":"address"}],"name":"getDonationsByDonor","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDonorRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')
var contractAddress = '0x05B6463706046ADDC673f73C63c8Ca27F558c496'; // from ganache account
var contract = new web3.eth.Contract(abi,contractAddress);
console.log(contract);

contract.methods.charitiesList(1).call().then(console.log)


const LoadTable = async () =>
    {
      var outputHTML = "";
      var animals = ["cat", "dog", "goat", "turkey", "buffalo"];
      var colour = ["brown", "black", "white"];
      var adjective = ["wild", "hairy", "domesticated", "crazy"];

      // loop over our arrays and create our html string
      outputHTML += "<table>";
      for (var i = 0; i < animals.length; i++) {
          for (var j = 0; j < colour.length; j++) {
              outputHTML += "<tr>";
              for (var k = 0; k < adjective.length; k++) {
                  outputHTML += "<td>" + adjective[k] + " " + colour[j] + " " + animals[i] + "</td>";
              }
              outputHTML += "</tr>";
          }
      }
      outputHTML += "</table>";

      // output our html
      document.getElementById("output_div").innerHTML = outputHTML;
    }

const Table = () => {
    return (

      <div id="output_div" >
      <input type="button"  value="Show the table" onClick={LoadTable} />
      </div>
    )
}

export default Table
