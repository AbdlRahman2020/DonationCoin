// import Web3 from 'web3'
// import React, {useState} from 'react'

// const Test = () => {
//     let admins = require('./ABI.json');
//     const abi = admins[0].abi
//     const [owner, setOwner] = useState('')
//     var web3 = new Web3();
//     const init = () => {
//         if (typeof web3 !== 'undefined') {
//             console.log('Web3 found');
//             window.web3 = new Web3(web3.currentProvider);
//             web3.eth.defaultAccount = web3.eth.accounts[0];
//         } else {
//             console.error('web3 was undefined');
//         }
//     }
//     // get abi
    

//     // contractAddress
//     const getOwner = async () => {
//         // init();
//         web3 = new Web3('http://localhost:8545')
//         // return web3.eth.getBlock('latest', (err, result) => {console.log(1)})
//         const contractAddress = '0x457796b00214E6514fE3AfC6380b70412727D146'
//         const contract = new web3.eth.Contract(abi, contractAddress)
//         console.log(contract)
//         contract.methods.getOwner().call((err, result) => {
//             if (err){
//                 console.log(err)
//             } else {
//                 console.log(JSON.stringify(result))
//             }
//         })
//         const accounts = await web3.eth.getAccounts();
//         console.log(accounts)
//         // await web3.eth.getAccounts().then(function(accounts){
//         //     console.log(accounts[0])
//         // }).catch(function(tx){
//         //     console.log(tx);
//         // })

//     }
//     return (
//         <div>
//             <button onClick={() => getOwner()}>??</button>
//         </div>
//     )
// }

// export default Test

