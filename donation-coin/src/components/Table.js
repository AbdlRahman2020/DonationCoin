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
var contractAddress = '0x7fa1d3eFA2B6e276DF33D80BBce8dAC0F5F3Ba90'; // from ganache account
var contract = new web3.eth.Contract(abi,contractAddress);
console.log(contract);
//contract.methods.donations(0).call().then(console.log);


const LoadTable = async () =>
    {
      var outputHTML = '<div className="table-box">';
      outputHTML += "<table>";
      outputHTML += "<tr>";
      outputHTML += "<th>From</th>";
      outputHTML += "<th>To</th>";
      outputHTML += "<th>Amount</th>";
      outputHTML += "<th>Message</th>";
      outputHTML += "</tr>";
      for (var i = 0; i < 3; i++) {
        if (contract.methods.donations(i)==null){
          break;
        }
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
            outputHTML += "</table>";
            outputHTML += "</div>";
            document.getElementById("output_div").innerHTML = outputHTML;
      });

      }
      /*console.log(donation);
      var charity;
      var charity = donation.then((donation) => {
        return donation._from;
      });
      console.log(charity);



      let from2 = charity.then((res) => {
          console.log(res);
      });*/
      //console.log(logMessages[3])



      // loop over our arrays and create our html string
      /*for (var i = 0; i < 2; i++) {
        var donation = contract.methods.donations(i).call();
        var from = donation.then((donation) => {
          return donation._from;
        });
        var charity = donation.then((donation) => {
          return donation._to;
        });
        var amount = donation.then((donation) => {
          return donation.amount;
        });
        var message = donation.then((donation) => {
          return donation.message;
        });
        var from3=logMessages[4];

          outputHTML += "<tr>";
          outputHTML += "<td>" + from3 + "</td>";
          outputHTML += "<td>" + charity + "</td>";
          outputHTML += "<td>" + amount + "</td>";
          outputHTML += "<td>" + message + "</td>";
          outputHTML += "</tr>";
      }
      outputHTML += "</table>";*/

      // output our html

    }

const Table = () => {
    return (
      <div id="output_div">
      <button className="LoginBtn" onClick={LoadTable}>Show the table</button>
      </div>
    )
}

export default Table
