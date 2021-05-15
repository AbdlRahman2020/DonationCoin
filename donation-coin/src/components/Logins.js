import { useState, useEffect } from "react"
import {useHistory} from 'react-router-dom'
const Logins = ({setCurrentUser, setAmount}) => {
    const history = useHistory()
    const [isdonate, setDonate] = useState(false)
    const [ischarity, setCharity] = useState(false)
    
    return (
        <div className="logins" >
            
            <button className="LoginBtn" onClick={() => history.push('/donator')}>Donate now!</button>
            <button className="LoginBtn" onClick={() => history.push('/charity')}>Create a new funding</button>
            
        </div>
    )
}

export default Logins