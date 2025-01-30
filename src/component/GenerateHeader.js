import '../index.css';
import React, { useState } from "react";

export function HeaderBar({}){

    const [showMenu, setShowMenu] = useState(false);

    return (
    <header>
      <div className="navBar">
        <ul className="menu">
          <li className="menu_item">
            <a href="index.html">Students</a>
          </li>
          <li className="menu_item">
            <a href="projects.html">Projects</a>
          </li>
          <li className="menu_button">
            <div className="profile-menu">
              <button className="users" onClick={() => setShowMenu(!showMenu)}>
                <img src='/' alt="person" />
              </button>
                <ul className={`submenu ${showMenu ? 'show' : ''}`}>
                  <li className="profile">
                    <a href="profile.html">Profile</a>
                  </li>
                  <li className="projects">
                    <a href="my_projects.html">Projects</a>
                  </li>
                  <li className="group">
                    <a href="group.html">Group</a>
                  </li>
                  <li className="logout">
                    <a href="logout.html">Logout</a>
                  </li>
                </ul>
            </div>
          </li>
        </ul>
      </div>
    </header>
    );
}

