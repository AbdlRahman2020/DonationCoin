import React from 'react'
import {HashRouter, Route, Switch, BrowserRouter} from 'react-router-dom'
import Charity from './Charity'
import Donator from './Donator'
import Homepage from './Homepage'
// import DonatorLogin from './donatorLogin'
// import DonatorSignup from './donatorSignup'
import CharitySignup from './CharitySignup'
import {useEffect} from 'react'
import DonatorLogin from './DonatorLogin'
import DonatorSignup from './DonatorSignup'
import Donatorinterface from './Donatorinterface'
import Charityinterface from './Charityinterface'
const BasicRoute = () => {
    useEffect(() => {
        document.title = "donationCoin"
     }, []);
    return (
        <BrowserRouter history={BrowserRouter}>
            <Switch>
                <Route exact path="/" component={Homepage}/>
                <Route exact path="/charity" component={Charity}/>
                <Route exact path="/donator" component={Donator}/>
                <Route path="/donatorlogin" component={DonatorLogin}/>
                <Route path="/donatorsignup" component={DonatorSignup}/>
                <Route path="/charitysignup" component={CharitySignup}/>
                <Route path='/donator/:currentAddress' component={Donatorinterface}/>
                <Route path="/charityinterface/:currentAddress" component={Charityinterface}/>
            </Switch>
        </BrowserRouter>
    )
}

export default BasicRoute;