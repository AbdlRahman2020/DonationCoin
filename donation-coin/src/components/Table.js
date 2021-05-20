import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import * as Web3 from "web3";
import $ from 'jquery';
import {abi} from '../ContractData.js';
import {contractAddress} from '../ContractData.js'
/*var logBackup = console.log;
var logMessages = [];
var result;
console.log = function() {
  logMessages.push.apply(logMessages, arguments);
  logBackup.apply(console, arguments);
};*/

const web3 = new Web3(window.web3.currentProvider);
var contract = new web3.eth.Contract(abi,contractAddress);
console.log(contract);
//contract.methods.donations(0).call().then(console.log);

contract.methods.charitiesList(1).call().then(console.log)


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
