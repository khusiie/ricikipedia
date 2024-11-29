import React from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from './page/Home'
import './App.css'
import Location from './page/Location';
import LocationDetails from './page/LocationDetails';
import CharacterDetails from './page/CharacterDetails';

const App = () => {
  return (
    <div>
      <BrowserRouter>
          <Routes>
            <Route path="/" element={<Home/>} />
            <Route path='/location' element={<Location/>} />
            <Route path='/location/:id' element={<LocationDetails/>}/>
            <Route path='/character/:id' element={<CharacterDetails/>}/>
          </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App