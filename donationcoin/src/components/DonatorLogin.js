import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import Web3 from 'web3'
const DonatorLogin = () => {
    
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    var success = false;
    const history = useHistory()
    var web3 = new Web3();
    web3 = new Web3('HTTP://127.0.0.1:8545');
    let admins = require('./ABI.json');
    const abi = admins[0].abi;
    
   
    const submitInput = async (e) => {
        var currentAccount;
        var contract = new web3.eth.Contract(abi, currentAccount)
        
        e.preventDefault()
        if (username && password) {
            
            console.log(username);
            console.log(password);
            await web3.eth.getAccounts().then(function(accounts){
            // need a function in contract to map existing donator address to [password, value] pair
            // they used the pair to login
            // for each address for accounts, cheak their password and username for login in,
            
               contract.methods.xxx(each_address).call().then(
                   function(pair){
                       if(pair === [username, password]){
                            success = true // if not work, use useState to set this variable
                            currentAccount = "0x"// the account adress corresponding to this pair
                       }
                   }
                )
               

                
            })
            // if correct, then log in to their own page.
            console.log(success === true);
            if (success === true){
                //log in sucessfully
                history.push({pathname: '/donator/' + currentAccount, state: {
                    address: currentAccount }})
                
            }
            else{
                // can't log in
                alert("username and password doesn't exist")
            }
            
        } 
        else{
            // password or username is null
            alert("please use valid username and password")
            
        }
        
        
    }
    return (
        <div >
                    <Link to="/donator" style={{position:'absolute', marginLeft:"80vw", marginTop:"5vh", color:"red"}}>Click here to go back</Link>
                    <form action="" className="labelinput" onSubmit={submitInput}>
                    <h1 style={{color:"#92eb49", textAlign:"center", minHeight:"20vh", marginTop:"10vh"}}>User  login</h1>
                    {/* <label htmlFor="" className="label">
                        Username:
                    </label> */}
                        <input type="text" className="label" value={username}  placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
                        {/* <label htmlFor="" className="label">Password:</label> */}   
                        <input type="text" className="label" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                        <input type="submit"  value="Enter" className="submit" />
                        
                    </form>
                    
                    
        </div>
    )
}

export default DonatorLogin
