import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Opponent from './components/opponentPage';
// import App from './pages/App';
import Home from './pages/Home';
import Player from './pages/player';
export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/player" element={<Player/>}/>
            <Route path="/opponent" element={<Opponent/>}/>
            <Route path="/" element={<Home/>}/>
        </Routes>
        </BrowserRouter>
    )
}