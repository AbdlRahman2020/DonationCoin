import {useState} from 'react'
import {useHistory, Link} from 'react-router-dom'


const CharitySignup = () => {
    const [wallet, setWallet] = useState('');
    // const [password, setPassword] = useState('');
    const history = useHistory();
    const [success, setSuccess] = useState(false);
  

    const submitInput = async (e) => {
        //if not deplicated  and -> success otherwise fail
        // verify the owner
        e.preventDefault()
        // if create a new organization, then  add it to Category.js
    }    

    return (
        <div >
                    <form action="" className="labelinput" onSubmit={submitInput}>
                    <h3 style={{color:"#92eb49", textAlign:"center", minHeight:"10vh", marginTop:"3vh"}}>Charity reigistration</h3>
                    <input type="text" className="label" value={wallet}  placeholder="Wallet" onChange={(event) => setWallet(event.target.value)}/>

                    <input type="submit"  value="Enter" className="submit" />

                    </form>
        </div>
    )
}

export  default CharitySignup
