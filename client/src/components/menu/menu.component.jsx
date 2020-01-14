import React from 'react';
import { Link } from 'react-router-dom';

import './menu.styles.scss';

const Menu = () => {
  return (
    <div>
      <div className='menu-container'>
        <Link to='/'>
          <h4>Home</h4>
        </Link>
        <Link to='/recently-played'>
          <h4>Recently Played</h4>
        </Link>
        <Link to='/top-artists'>
          <h4>Top Artists</h4>
        </Link>
        <Link to='/top-tracks'>
          <h4>Top Tracks</h4>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
