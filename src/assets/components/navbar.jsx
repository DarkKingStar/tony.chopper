import React, { useState } from 'react';
import "./navbar.css";
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBox from './searchbox';

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();

    const toggleLinks = () => {
        setShowLinks(!showLinks);
    }

    const handleShowSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    }

    const isHomePage = location.pathname === '/';

    return (
        <>
            <div className="container md-2">
                <div className="navbar-container">
                    <nav>
                        <div className="navbar">
                            <div className={`nav-toggle ${showLinks ? 'active' : ''}`} onClick={toggleLinks}>
                                <div className='menu-icon'></div>
                                <div className='menu-icon'></div>
                                <div className='menu-icon'></div>
                            </div>
                            <div className="nav-brand">CHOPPER&#x2022;IO</div>
                            <div className={`nav-links ${showLinks ? 'show' : ''}`}>
                                {!isHomePage && <div className="nav-item" onClick={() => navigate("/")}>Home</div>}
                                <div className="nav-item">Genres</div>
                                {!isHomePage && <div className="nav-item" onClick={() => handleShowSearchBar()}>Search</div>}
                            </div>
                            <div className="nav-user">Login</div>
                        </div>
                    </nav>
                </div>
            </div>
            {showSearchBar && <SearchBox/>}
        </>
    );
}

export default Navbar;
