import { useState } from 'react'
import './App.css'
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from './pages/Home/Home';
import Characters from './pages/Characters/Characters';
import CharactersDetails from './pages/CharactersDetails/CharactersDetails';
import Comics from './pages/Comics/Comics';
import Header from './components/Header/Header';


function App() {


  return (

    <Router>
      <Header/>
      <Routes>

        <Route path='/' element={<Home/>}></Route>
        <Route path='/characters' element={<Characters/>}></Route>
        <Route path='/characters-details/:id' element={<CharactersDetails/>}></Route>
        <Route path='/comics' element={<Comics/>}></Route>
     
      </Routes>
    </Router>
  )
}

export default App
