
import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from 'react-router-dom';
import { useState } from 'react';

import ReactDOM from 'react-dom';
import './index.css';
import Header from './components/Header';
import Footer from './components/Footer';
import Logins from './components/Logins';
import About from './components/About';
import Category from './components/Category';
import Projects from './components/Projects';
import Searchbar from './components/SearchBar';


const Homepage = () => {
  
  const [currentCat, setCurrentCat] = useState("");

  return (
    <Router>
      <div className="container">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/"><Logins /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/browse"><Category setCurrentCat={setCurrentCat} /><Projects currentCat={currentCat} /></Route>
            <Route path="/track"><Searchbar /></Route>
          </Switch>
        </div>
        <Footer />
      </div>
    </Router>
  )
}

// ========================================

ReactDOM.render(
  <Homepage />,
  document.getElementById('root'),
);
