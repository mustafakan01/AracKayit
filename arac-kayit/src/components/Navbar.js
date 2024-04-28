import React from 'react';
import { Link } from 'react-router-dom';
import './style.css'; 

function Navbar() {
  return (
    <nav className="navbar-container"> 
      <ul className="navbar-list"> 
        <li className="navbar-item"> 
          <Link to="/" className="navbar-link">Home</Link>
        </li>
        <li className="navbar-item">
          <Link to="/car-list" className="navbar-link">Car List</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
