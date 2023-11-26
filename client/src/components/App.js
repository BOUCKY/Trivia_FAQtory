import React from "react";
import {Route, Routes} from "react-router-dom";
import Navbar from './Navbar'
import Home from './Home'
import Games from './Games'
import Hidden from './Hidden'
import Player from './Player'
import Final from './Final'
import '../styling/App.css'

function App() {
  return (
    <div className="App">
      <Navbar />
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='games' element={<Games />} />
        <Route path='hidden' element={<Hidden />} />
        <Route path='player' element={<Player />} />
        <Route path='wager' element={<Final />} />
      </Routes>
    </div>
  );
}

export default App;
