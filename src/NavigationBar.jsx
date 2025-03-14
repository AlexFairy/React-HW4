import React from 'react';
import { NavLink } from 'react-router-dom';
import './marvel.css';

function NavigationBar() {
  return (
    <nav>
      <NavLink to="/" activeclassname="active">
        Home
      </NavLink>
      <NavLink to="/browse-characters" activeclassname="active">
        Browse Characters
      </NavLink>
    </nav>
  );
}

export default NavigationBar;
