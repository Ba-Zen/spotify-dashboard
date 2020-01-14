import React from 'react';
import { Link } from 'react-router-dom';
import { ReactComponent as User } from '../../assets/user.svg';
import { ReactComponent as History } from '../../assets/history.svg';
import { ReactComponent as Artist } from '../../assets/artist.svg';
import { ReactComponent as Tracks } from '../../assets/tracks.svg';

import './menu.styles.scss';

const Menu = () => {
  return (
    <div>
      <div className='menu-container'>
        <Link to='/'>
          <div className='link-container'>
            <User className='icon' />
            <h4>Profile</h4>
          </div>
        </Link>
        <Link to='/recently-played'>
          <div className='link-container'>
            <History className='icon' />
            <h4>Recent</h4>
          </div>
        </Link>
        <Link to='/top-artists'>
          <div className='link-container'>
            <Artist className='icon' />
            <h4>Top Artists</h4>
          </div>
        </Link>
        <Link to='/top-tracks'>
          <div className='link-container'>
            <Tracks className='icon' />
            <h4>Top Tracks</h4>
          </div>
        </Link>
      </div>
    </div>
  );
};

export default Menu;
