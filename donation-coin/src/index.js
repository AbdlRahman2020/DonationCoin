
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
  const [projects, setProjects] = useState([{
    name: 'DWB',
    address: 1,
    category: 'Medical'
  },
  {
    name: 'Gates Foundation',
    address: 2,
    category: 'Education'
  },
  {
    name: 'WWF',
    address: 3,
    category: 'Wildlife'
  }

  ]);



  const [currentCat, setCurrentCat] = useState("");

  return (
    <Router>
      <div className="container">
        <Header />
        <div className="content">
          <Switch>
            <Route exact path="/"><Logins /></Route>
            <Route path="/about"><About /></Route>
            <Route path="/browse"><Category setCurrentCat={setCurrentCat} /><Projects projects={projects.filter(project => project.category.includes(currentCat))} /></Route>
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
