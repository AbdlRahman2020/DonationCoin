import React from 'react'
import Button from './Button.js'
import {useState, useEffect} from 'react'
import Header from './Header'
import { useHistory } from "react-router-dom"
import Test from './Test'

const Homepage = () => {
  const history = useHistory()


  return (
    <div className="whole">

        <Header headername={"Homepage"} />
        <div className="line"></div>
        <main>
          <div className="items">
            <div className="item"><Button  onClick={() => history.push('/donator')} buttonname={'donator'}/>
            <p>Click donator to login or signup</p></div>
            <div className="item"><Button  onClick={() => history.push('/charity')} buttonname={'charity'}/>
            <p>Click charity to signup if you are the owner</p></div>
          </div>
    
        </main>
        {/* <Main   buttonname={'act'}   /> */}
        <Test/>
      </div>
  )
}

export default Homepage

