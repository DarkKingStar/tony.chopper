"use client";
import React, { useEffect, useState } from "react";
// import { useRouter } from 'next/router'; // Use Next.js router
// import SearchBox from './searchbox';
import "./navbar.css";
const Navbar = () => {
  const [showLinks, setShowLinks] = useState(false);
  const [showSearchBar, setShowSearchBar] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [windowHeight, setWindowHeight] = useState<number>(0);
  const [visible, setVisible] = useState<boolean>(true);


  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [windowHeight, visible]);

  const handleScroll = () => {
    const currentYOffset = window.pageYOffset;
    const visibleFlag = windowHeight > currentYOffset;
    setWindowHeight(window.scrollY);
    setVisible(visibleFlag);
  };

  useEffect(() => {
    const navBar = document.getElementById('navbar-container') as HTMLDivElement | null;
    if (!navBar) return; // do nothing if navBar is null
    if (visible === true) {
      // navBar.style.transition = 'transform 0.3s ease-in-out';
      navBar.style.animation = 'fadeOut 0.5s ease-in';
      navBar.style.transform = 'translateY(0%)';
      navBar.style.visibility = 'visible';
     
    } else {
      // navBar.style.transition = 'transform 0.3s ease-in-out';
      navBar.style.transform = 'translateY(-100%)';
      navBar.style.visibility = 'hidden';
    }
  }, [windowHeight, visible]);

  const toggleLinks = () => {
    setShowLinks(!showLinks);
  };

  const handleShowSearchBar = () => {
    setShowSearchBar(!showSearchBar);
  };

  return (
    <>
      <div className="navbar-container" id="navbar-container">
        <nav>
          <div className="navbar">
            <div
              className={`nav-toggle ${showLinks ? "active" : ""}`}
              onClick={toggleLinks}
            >
              <div className="menu-icon"></div>
              <div className="menu-icon"></div>
              <div className="menu-icon"></div>
            </div>
            <div className="nav-brand text-white">C H O P P E R{" "}&#x2022;{" "}I O</div>
            <div className={`nav-links ${showLinks ? "show" : "dontshow"}`}>
              <div className="nav-item">Home</div>
              <div className="nav-item">Genres</div>
              <div className="nav-item">Search</div>
            </div>
            <div className="nav-user">
                {/* Login */}
                </div>
          </div>
        </nav>
      </div>
      {/* {showSearchBar && <SearchBox navbarSearch={true} handleShowSearchBar={handleShowSearchBar}/>} */}
    </>
  );
};

export default Navbar;
