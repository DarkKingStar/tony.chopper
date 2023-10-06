import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InfoPage from './assets/components/Pages/InfoPage'; 
import HomePage from './assets/components/Pages/HomePage';
import WatchPage from './assets/components/Pages/WatchPage';
import Page404 from './Page404';
import Navbar from './assets/components/navbar';
import Footer from './assets/components/footer';

const AppRouter = () => {
  return (
    <Router>
      <div className='main'>
      <Navbar/>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info/:animeId" element={<InfoPage/>} />
        <Route path="/watch/:animeId" element={<WatchPage/>} />
        <Route path="/*" element={<Page404/>} />
      </Routes>
      </div>
      <Footer/>
    </Router>
  );
}

export default AppRouter;

