import React from 'react'
import Navbar from './components/Navbar'
import 'bootstrap/dist/css/bootstrap.min.css'
import {BrowserRouter as Router,Route,Routes} from "react-router-dom";
import Home from './Pages/Home';
import FetchData from './components/FetchData';
import Footer from './components/Footer';
import SignIn from './components/SignIn';
import Login from './components/Login';

const App = () => {

  return (
    <>
      <Router>
        <Navbar/> 
          <Routes>
            <Route exact path='/' element={<SignIn/>}/>
            <Route  path='login' element={<Login/>}/>
            <Route  path='register' element={<Home/>}/>
            <Route path='/general' element={<FetchData cat="general" />}/>
            <Route path='/Business' element={<FetchData cat="Business" />}/>
            <Route path='/Entertainment' element={<FetchData cat="Entertainment" />}/>
            <Route path='/Health' element={<FetchData cat="Health" />}/>
            <Route path='/Sports' element={<FetchData cat="Sports" />}/>
            <Route path='/Science' element={<FetchData cat="Science" />}/>
            <Route path='/Technology' element={<FetchData cat="Technology" />}/>
          </Routes>
          <Footer/>
        </Router>
    </>
  );
};

export default App

