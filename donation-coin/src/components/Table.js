import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import * as Web3 from "web3";
import $ from 'jquery';
import {abi} from '../ContractData.js';
import {contractAddress} from '../ContractData.js'


const web3 = new Web3(window.web3.currentProvider);
var contract = new web3.eth.Contract(abi,contractAddress);
console.log(contract);

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

      for (var i = 0; i < 50; i++) {
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
