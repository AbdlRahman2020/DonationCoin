import {useState, useEffect} from 'react'
import { unstable_concurrentAct } from 'react-dom/cjs/react-dom-test-utils.production.min';
import {useHistory, Link, useLocation, useParams} from 'react-router-dom'
import Web3 from 'web3'

const Charityinterface = () => {
    let admins = require('./ABI.json');
    const abi = admins[0].abi;
    const currentAccount = useLocation().pathname.split('/charity/')[1];
    const [transactions, setTrans] = useState([]);
    
    var web3 = new Web3();
    var contract;
    web3 = new Web3('HTTP://127.0.0.1:8545');
    
    // use this function to get transaction related to current charity
    web3.eth.getPastLogs({fromBlock:'0x0',address:'0x9e3319636e2126e3c0bc9e3134AEC5e1508A46c7'}).then(res => {
        res.forEach(rec => {
            console.log(rec.blockNumber, rec.transactionHash, rec.topics);
            setTrans([...transactions, [rec.blockNumber, rec.transactionHash, rec.topics]])
        });
        }).catch(err => console.log("getPastLogs failed", err));



    return (
        <div>
            <Link to="/charity" style={{position:'absolute', marginLeft:"80vw", marginTop:"5vh", color:"red"}}>Click here to go back</Link>
            <span>currentAccount:{currentAccount}</span>
            
            <p>transactions: {transactions}</p>
            
            
        </div>
    )
}

export default Charityinterface
