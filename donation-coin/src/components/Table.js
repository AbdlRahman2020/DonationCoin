import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import * as Web3 from "web3";
import $ from 'jquery';

/*var logBackup = console.log;
var logMessages = [];
var result;
console.log = function() {
  logMessages.push.apply(logMessages, arguments);
  logBackup.apply(console, arguments);
};*/

const web3 = new Web3(window.web3.currentProvider);
var abi = JSON.parse('[{"inputs":[],"stateMutability":"nonpayable","type":"constructor"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_address","type":"address"},{"indexed":false,"internalType":"string","name":"_cause","type":"string"}],"name":"NewCharity","type":"event"},{"anonymous":false,"inputs":[{"indexed":true,"internalType":"address","name":"_from","type":"address"},{"indexed":true,"internalType":"address","name":"_to","type":"address"},{"indexed":false,"internalType":"uint256","name":"_value","type":"uint256"}],"name":"NewDonation","type":"event"},{"anonymous":false,"inputs":[{"indexed":false,"internalType":"string","name":"_userName","type":"string"},{"indexed":false,"internalType":"address","name":"_address","type":"address"}],"name":"NewDonor","type":"event"},{"inputs":[{"internalType":"address","name":"_address","type":"address"}],"name":"_disapproveCharity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address payable","name":"_receiver","type":"address"},{"internalType":"string","name":"_donorName","type":"string"},{"internalType":"string","name":"_message","type":"string"}],"name":"_makeDonation","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"payable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_cause","type":"string"},{"internalType":"string","name":"_name","type":"string"}],"name":"_registerCharity","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"_donorName","type":"string"}],"name":"_registerDonor","outputs":[],"stateMutability":"nonpayable","type":"function"},{"inputs":[],"name":"balanceOf","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"charitiesList","outputs":[{"internalType":"address","name":"_address","type":"address"},{"internalType":"string","name":"cause","type":"string"},{"internalType":"string","name":"name","type":"string"},{"internalType":"bool","name":"isApproved","type":"bool"},{"internalType":"uint256","name":"totalCollected","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"charityType","outputs":[{"internalType":"string","name":"","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donationToDonor","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donations","outputs":[{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donorDonationCount","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"donors","outputs":[{"internalType":"address","name":"donorAddress","type":"address"},{"internalType":"string","name":"donorName","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"","type":"uint256"}],"name":"donorsList","outputs":[{"internalType":"address","name":"donorAddress","type":"address"},{"internalType":"string","name":"donorName","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"string","name":"_cause","type":"string"}],"name":"getCharityByCause","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"uint256","name":"_id","type":"uint256"}],"name":"getDonation","outputs":[{"internalType":"uint256","name":"id","type":"uint256"},{"internalType":"address","name":"_from","type":"address"},{"internalType":"address","name":"_to","type":"address"},{"internalType":"uint256","name":"amount","type":"uint256"},{"internalType":"string","name":"message","type":"string"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"_donor","type":"address"}],"name":"getDonationsByDonor","outputs":[{"internalType":"uint256[]","name":"","type":"uint256[]"}],"stateMutability":"view","type":"function"},{"inputs":[{"internalType":"address","name":"","type":"address"}],"name":"isDonorRegistered","outputs":[{"internalType":"bool","name":"","type":"bool"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"owner","outputs":[{"internalType":"address","name":"","type":"address"}],"stateMutability":"view","type":"function"},{"inputs":[],"name":"totalDonated","outputs":[{"internalType":"uint256","name":"","type":"uint256"}],"stateMutability":"view","type":"function"}]')
var contractAddress = '0xcC603B6CE9Df7b592A4a86Da26307B9d57A1780f'; // from ganache account
//var contractAddress = '0x05B6463706046ADDC673f73C63c8Ca27F558c496'; // from ganache account
var contract = new web3.eth.Contract(abi,contractAddress);
console.log(contract);
//contract.methods.donations(0).call().then(console.log);


const LoadTable = async () =>
    {
      var outputHTML = "<div class=\"table-box\">";
      outputHTML += "<table>";
      outputHTML += "<tr>";
      outputHTML += "<th>From</th>";
      outputHTML += "<th>To</th>";
      outputHTML += "<th>Amount</th>";
      outputHTML += "<th>Message</th>";
      outputHTML += "</tr>";

      for (var i = 0; i < 10; i++) {
        /*if (contract.methods.donations(i)==null){
          break;
        }*/
          contract.methods.donations(i).call().then(function (donation){
          var from = donation._from;
          var charity = donation._to;
          var amount = donation.amount;
          var message = donation.message;
            outputHTML += "<tr>";
            outputHTML += "<td>" + from + "</td>";
            outputHTML += "<td>" + charity + "</td>";
            outputHTML += "<td>" + amount/1000000000000000000 + "</td>";
            outputHTML += "<td>" + message + "</td>";
            outputHTML += "</tr>";
            console.log(outputHTML);
            console.log(i);
          });

      }
      /*outputHTML += "</table>";
      outputHTML += "</div>";
      console.log(outputHTML);
      document.getElementById("output_div").innerHTML = outputHTML;*/
      contract.methods.donations(0).call().then(function (donation){
        outputHTML += "</table>";
        outputHTML += "</div>";
        console.log(outputHTML);
        document.getElementById("output_div").innerHTML = outputHTML;

      });
    }

const Table = () => {
    return (
      <div id="output_div">
      <button className="LoginBtn" onClick={LoadTable}>Show the table</button>
      </div>
    )
}

export default Table
