import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import Button from './Button'
import DonatorLogin from './DonatorLogin'
import DonatorSignup from './DonatorSignup'
import { useHistory } from "react-router-dom"
const Donator = () => {

    const history = useHistory()

    const getInput = (e) => {

        console.log(e)

    }
    // two buttons, can log in or sign up
    const clickLogin = (e) => {
        console.log(e)
        if (e.target.innerText !== "Login"){
            history.push("/donatorsignup")
        }
        else{
            history.push("/donatorlogin")
        }

    }

    return (
       
          <div>
              <Link to="/" style={{position:'absolute', marginLeft:"80vw", marginTop:"-5vh", color:"red"}}>Click here to go back</Link>
            <div><h1 style={{color:"#92eb49", textAlign:"center", minHeight:"9vh", marginTop:"10vh"}}>User reigistration and login</h1></div>
            <div className="line"></div>
             <div className="seperatebutton">
                <div><Button buttonname="Login" onClick={clickLogin}/></div>
                <div><Button buttonname="Signup" onClick={clickLogin}/></div>
            </div>

          </div>

    )
}

export default Donator
