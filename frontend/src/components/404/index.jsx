import React from 'react';
import Navigation from '../Navigation';
import './404.css';

const NotFound = () => (
  <>
    <Navigation />
    <div className='fofContainer'>
      <h1 className='fofHeading'>The page you are looking for could not be found</h1>
      <img
        className='modCheck'
        src='https://c.tenor.com/Sho8WQqDEvgAAAAi/mod-check.gif'
        alt='modCheck'
      />
    </div>
  </>
);

export default NotFound;
