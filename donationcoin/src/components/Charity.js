import React from 'react'
import {Link} from 'react-router-dom'
import {useState} from 'react'
import Button from './Button'
import DonatorLogin from './DonatorLogin'
import DonatorSignup from './DonatorSignup'
import { useHistory } from "react-router-dom"
const Charity = () => {

    const history = useHistory()

    const getInput = (e) => {

        console.log(e)

    }
    // implement this function to check the user is the owner of the blockchian or not
    const cheakPermission = () => {
        return true
    }
    const clickSignup = (e) => {
        console.log(e)
        // if the owner
        if (cheakPermission){
            history.push("/charitysignup")
        
        }
        else{
            alert("You are not the owner of the blockchain\n, so you don't have chance to add a new charity");

        }

    }

    return (
       
          <div>
              <Link to="/" style={{position:'absolute', marginLeft:"80vw", marginTop:"-5vh", color:"red"}}>Click here to go back</Link>
            <div><h1 style={{color:"#92eb49", textAlign:"center", minHeight:"9vh", marginTop:"10vh"}}>Charity reigistration</h1></div>
            <div className="line"></div>
             <div className="seperatebutton">
                <div><Button buttonname="Signup" onClick={clickSignup}/></div>
            </div>

          </div>

    )
}

export default Charity
