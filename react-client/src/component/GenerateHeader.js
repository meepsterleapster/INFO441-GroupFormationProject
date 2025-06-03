import '../index.css';
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import img from '../data/img/person.png'

export function HeaderBar({ }) {

  const [showMenu, setShowMenu] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(null);

  useEffect(() => {
    async function checkLogin() {
      try {
        const res = await fetch('/profile/status', { credentials: 'include' });
        const data = await res.json();
        setIsLoggedIn(data.loggedIn);
      } catch (err) {
        console.error('Failed to verify login status:', err);
        setIsLoggedIn(false);
      }
    }
    checkLogin();
  }, []);

  return (
    <header>
      <div className="navBar">
        <ul className="menu">
          <li className="menu_item">
            <Link to="/">Students</Link>
          </li>
          <li className="menu_item">
            <Link to="/projects">Projects</Link>
          </li>
          <li className="menu_button">
            <div className="profile-menu">
              <button className="users" onClick={() => setShowMenu(!showMenu)}>
                <img src={img} alt="default" />
              </button>
              <ul className={`submenu ${showMenu ? 'show' : ''}`}>
                <li className="profile">
                  <Link to="/profile">Profile</Link>
                </li>
                <li className="projects">
                  <Link to="/myProjects">Projects</Link>
                </li>
                <li className="group">
                  <Link to="/group">Group</Link>
                </li>
                {isLoggedIn ? (
                  <li className="logout">
                    <a href="/signout">Log Out</a>
                  </li>
                ) : (
                  <li className="login">
                    <a href="/signin">Login</a>
                  </li>
                )}
              </ul>
            </div>
          </li>
        </ul>
      </div>
    </header>
  );
}

