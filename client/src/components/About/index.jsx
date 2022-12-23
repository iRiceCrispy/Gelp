import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import './About.scss';

const About = () => {
  const frontend = [
    'JavaScript',
    'React',
    'Redux',
    'HTML',
    'CSS',
  ];

  const backend = [
    'JavaScript',
    'Node.js',
    'Express.js',
    'PostgreSQL',
    'Sequelize',
  ];

  return (
    <footer id='about'>
      <div className='tech'>
        <p className='heading'>Technologies Used</p>
        <div className='content'>
          <div className='frontend'>
            <p className='heading2'>Frontend</p>
            <div>
              {frontend.map((tech, i) => (
                <p key={i}>{tech}</p>
              ))}
            </div>
          </div>
          <div className='backend'>
            <p className='heading2'>Backend</p>
            <div>
              {backend.map((tech, i) => (
                <p key={i}>{tech}</p>
              ))}
            </div>
          </div>
        </div>
      </div>
      <div className='about'>
        <p className='heading'>About Me</p>
        <div className='content'>
          <a
            href='https://github.com/iRiceCrispy'
            target='_blank'
            rel='noreferrer'
          >
            <span className='icon'>
              <FontAwesomeIcon icon='fa-brands fa-github' />
            </span>
            <span className='text'>
              Github
            </span>
          </a>
          <a
            href='https://www.linkedin.com/in/erichuang-97/'
            target='_blank'
            rel='noreferrer'
          >
            <span className='icon'>
              <FontAwesomeIcon icon='fa-brands fa-linkedin' />
            </span>
            <span className='text'>
              LinkedIn
            </span>
          </a>
        </div>
      </div>
    </footer>
  );
};
export default About;
