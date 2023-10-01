import React, { useState } from 'react';
import "./navbar.css";
import { useNavigate } from 'react-router-dom';
const Navbar = () => {
    const [showLinks, setShowLinks] = useState(false);
    const navigate = useNavigate();
    const toggleLinks = () => {
        setShowLinks(!showLinks);
    }

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
                                <div className="nav-item" onClick={() => navigate("/")}>Home</div>
                                <div className="nav-item">Genres</div>
                                <div className="nav-item">More</div>
                            </div>
                            <div className="nav-user">Login</div>
                        </div>
                    </nav>
                </div>
            </div>
        </>
    );
}

export default Navbar;
