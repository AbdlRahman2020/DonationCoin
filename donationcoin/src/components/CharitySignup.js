import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'
import Web3 from 'web3'

const CharitySignup = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const history = useHistory();
    const [success, setSuccess] = useState(false)
    var web3 = new Web3();
    web3 = new Web3('HTTP://127.0.0.1:8545');
    let admins = require('./ABI.json');
    const abi = admins[0].abi;

    const submitInput = async (e) => {
        var currentAccount;
        var contract = new web3.eth.Contract(abi, currentAccount)

        e.preventDefault()
        if (username && password) {
            console.log(username)
            console.log(password)
            // create a new account
            await web3.eth.getAccounts().then(function(accounts){
                // need a function in contract to map existing charity address to [password, value] pair
                // they used the pair to signup
                // for each address for accounts, cheak their password and username for signup,
                
                   contract.methods.xxx(each_address).call().then(
                       function(pair){
                           if(pair === [username, password]){
                                setSuccess(true) 
                                // success = true means can't sign up since already exists [username, password] pair
                           }
                       }
                    )
                   
    
                    
                })
                if (success !== true){
                    // sign up sucessfully
                    web3.eth.personal.newAccount(username + password, function(err, res){
    
                        console.log("error: "+err);
                        console.log("res: "+res);
            
                    });
                    
                    web3.eth.getAccounts().then(function(accounts){
                        // need a function in contract to map [password, value] pair to new created charity address
                        // they used the pair to login
                        // currentAccount is new created one
                        // aim to bind [username, password] to account
                        currentAccount = accounts[-1]
                        contract.methods.xxx([username, password]).send({from: currentAccount}).then(
                            // function or not           
                            
                            )
                        // to self charitypage
                        history.push({pathname: '/charity/' + currentAccount, state: {
                            address: currentAccount }})
                    })
                    
                    
                }
                else{
                    alert("username exists, try another one or log in")
                }
            
            
            
        } 
        else{
            alert("please use valid username and password")


        }
    }

    return (
        <div >
                    <Link to="/charity" style={{position:'absolute', marginLeft:"80vw", marginTop:"5vh", color:"red"}}>Click here to go back</Link>
                    {/* <label htmlFor="" className="label">
                        Username:
                    </label> */}
                    <form action="" className="labelinput" onSubmit={submitInput}>
                    <h1 style={{color:"#92eb49", textAlign:"center", minHeight:"20vh", marginTop:"10vh"}}>Charity reigistration</h1>

                    <input type="text" className="label" value={username}  placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>



                    {/* <label htmlFor="" className="label">Password:</label> */}


                    <input type="text" className="label" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>



                    <input type="submit"  value="Enter" className="submit" />

                    </form>
        </div>
    )
}

export default CharitySignup
