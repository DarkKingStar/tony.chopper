import React, { useEffect, useState } from 'react';
import "./navbar.css";
import { useNavigate, useLocation } from 'react-router-dom';
import SearchBox from './searchbox';

const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const [showSearchBar, setShowSearchBar] = useState(false);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
        if (location.pathname === '/') {
            setShowSearchBar(false);
        }
    }, [location.pathname])
    const toggleLinks = () => {
        setShowLinks(!showLinks);
    }

    const handleShowSearchBar = () => {
        setShowSearchBar(!showSearchBar);
    }

    const isHomePage = location.pathname === '/';
    const isGenrePage = location.pathname === '/genre';

    return (
        <>
            <div className="container">
                <div className="navbar-container">
                    <nav>
                        <div className="navbar">
                            <div className={`nav-toggle ${showLinks ? 'active' : ''}`} onClick={toggleLinks}>
                                <div className='menu-icon'></div>
                                <div className='menu-icon'></div>
                                <div className='menu-icon'></div>
                            </div>
                            <div className="nav-brand">CHOPPER&#x2022;IO</div>
                            <div className={`nav-links ${showLinks ? 'show' : 'dontshow'}`}>
                                {!isHomePage && <div className="nav-item" onClick={() => {navigate("/");toggleLinks()}}>Home</div>}
                                {!isGenrePage && <div className="nav-item" onClick={() => {navigate("/genre");toggleLinks()}}>Genres</div>}
                                {!isHomePage && <div className="nav-item" onClick={() => {handleShowSearchBar();toggleLinks()}}>Search</div>}
                            </div>
                            <div className="nav-user">Login</div>
                        </div>
                    </nav>
                </div>
            </div>
            {showSearchBar && <SearchBox navbarSearch={true} handleShowSearchBar={handleShowSearchBar}/>}
        </>
    );
}

export default Navbar;
