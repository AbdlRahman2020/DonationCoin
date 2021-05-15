import React from 'react'
import {useState} from 'react'
const DonatorLogin = () => {
    const [user, setCurrentUser] = useState('');
    const [amount, setAmount] = useState('');
    const submitInput = (e) => {
        e.preventDefault()
        console.log(user)
        console.log(amount)

        //use  user as wallet and amount as money the user wants to donate
        //implement a function to ask for pessmission and if permit then check if the amount of money in his wallet can afford that transcation, if can, then 
        // transcation, use home nva to return 
        
        //log in is not real log in, instead it web3 injection to force transcation. if successful, store it to transcations
    }
    return (
        
            <form action="" className="labelinput" onSubmit={(e) => submitInput(e)}>
                    <h1 style={{color:"#92eb49", textAlign:"center", minHeight:"10vh", marginTop:"3vh"}}>User  login</h1>
                    
                        <input type="text" className="label" value={user}  placeholder="Wallet" onChange={(event) => setCurrentUser(event.target.value)}/>
                        <input type="text" className="label" value={amount}  placeholder="Amount" onChange={(event) => setAmount(event.target.value)}/>
                        <input type="submit"  value="Enter" className="submit" />
            </form>
        
    )
}

export default DonatorLogin
