import React from 'react';
import { BrowserRouter, Route,Routes } from 'react-router-dom';
import Opponent from './pages/opponentPage';
import App from './pages/App';
export default function AppRoutes(){
    return(
        <BrowserRouter>
        <Routes>
            <Route path="/opponent" element={<Opponent/>}/>
            <Route path="/" element={<App/>}/>
        </Routes>
        </BrowserRouter>
    )
}