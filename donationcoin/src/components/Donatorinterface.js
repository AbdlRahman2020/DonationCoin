import {useState, useEffect} from 'react'
import { unstable_concurrentAct } from 'react-dom/cjs/react-dom-test-utils.production.min';
import {useHistory, Link, useLocation, useParams} from 'react-router-dom'
import Web3 from 'web3'

const Donatorinterface = () => {
    // use our abi
    let admins = require('./ABI.json');
    const abi = admins[0].abi;
    const currentAccount = useLocation().pathname.split('/donator/')[1];
    const [balance, setBalance] = useState(0);
    const [donateamount, setDonateamount] = useState(0);
    const [increase_self_amount, setIncrease] = useState(0);
    const [tocharity, setTocharity] = useState("");
    var web3 = new Web3();
    var contract;
    web3 = new Web3('HTTP://127.0.0.1:8545');
    
    web3.eth.getBalance(currentAccount).then(
        function(wei){
            setBalance(web3.utils.fromWei(wei, 'ether'));
            
        }
    )
    contract = new web3.eth.Contract(abi, currentAccount)

    //create select items
    function createSelectItems() {
        var items = [];
        // you need to implement a function which can return all charity address, 
        // and assign to addresses, maybe just use web3.eth.getAccounts().then(function(accounts)...)  can help
        var addresses = [1,2,3,4,5,6,7];

        items.push(<option value="" disabled selected>Clck to select charity</option> )
        for (let i = 1; i <= addresses.length; i++) {             
             items.push(<option key={addresses[i - 1]} value={addresses[i - 1]}>{"Charity " + addresses[i - 1]}</option>);   
             
        }
        return items;
    }  
    //on drop down select
    function onDropdownSelected(e) {
        console.log("The Charity", e.target.value);
       // e.target.value is selcted charity address
        setTocharity(e.target.value)

   }

   // need the method in contract for donating money to charity
    const donateMoney = async () => {
        
        //  the method to donate money to charity
        // currentAccount, tocharity are from and to addresses
        web3.eth.getAccounts(function(error, result) {
            web3.eth.sendTransaction(
                {from: currentAccount,
                to: "0x",
                value:  1, 
                data: 1
                    }, function(err, transactionHash) {
              if (!err)
                console.log(transactionHash + " success"); 
            });
        });
        alert(`You've donated ${donateamount} to charity ${tocharity}`)
   }

   // need the method in contract for increasing  money in self-account, otherwise new created user
   // has no eth by default
   const increaseself = async () => {
       contract.methods.inrease(increase_self_amount).send({from: currentAccount}).then(
           // function here
       )
        

   }
    



    return (
        <div>
            <Link to="/donator" style={{position:'absolute', marginLeft:"80vw", marginTop:"5vh", color:"red"}}>Click here to go back</Link>
            <span>currentAccount:{currentAccount}</span>
            
            <p>balance: {balance}</p>
            <div className="option">
                <select onChange={(e) => onDropdownSelected(e)}>
                    {createSelectItems()}
                </select>
            </div>
            <input type="text" className="label" value={donateamount}  placeholder="0" onChange={(event) => setDonateamount(event.target.value)}/>
            <button style={{marginRight:"10vw"}} className="smallbutton" onClick={() => donateMoney()}>donate</button>
            <input type="text" className="label" value={increase_self_amount}  placeholder="0" onChange={(event) => setIncrease(event.target.value)}/>
            <button className="smallbutton" onClick={() => donateMoney()}>Increase self account</button>
            
        </div>
    )
}

export default Donatorinterface
