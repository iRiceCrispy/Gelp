import React from 'react';
import Navigation from '../Navigation';
import GameList from './GameList';
import './Splash.css';

const Splash = () => (
  <div className='mainContainer'>
    <div
      className='headContainer'
      style={{
        backgroundImage: 'url(\'https://thenerdstash.com/wp-content/uploads/2015/10/Project-Zomboid.png\')',
      }}
    >
      <div className='innerHeadContainer'>
        <Navigation />
      </div>
    </div>
    <div className='bodyContainer'>
      <p>Find the Best Games Online</p>
      <GameList />
    </div>
  </div>
);

export default Splash;
