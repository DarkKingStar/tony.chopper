import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import InfoPage from './assets/components/Pages/InfoPage'; 
import HomePage from './assets/components/Pages/HomePage';
import WatchPage from './assets/components/Pages/WatchPage';
import Page404 from './Page404';

const AppRouter = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/info/:animeId" element={<InfoPage/>} />
        <Route path="/watch/:animeId" element={<WatchPage/>} />
        <Route path="/*" element={<Page404/>} />
      </Routes>
    </Router>
  );
}

export default AppRouter;

