import React from 'react';
import './landing.styles.scss';
import { Link, Redirect } from 'react-router-dom';
import { useSelector } from 'react-redux';

const Landing = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  if (isAuthenticated) {
    return <Redirect to='/home' />;
  }

  return (
    <div>
      <section className='landing'>
        <div className='dark-overlay'>
          <div className='landing-inner'>
            <h1 className='x-large'>Task Tracker</h1>
            <p className='lead'>
              Track your tasks, be in time and measure your results !
            </p>
            <div className='buttons'>
              <Link to='/register' className='btn btn-tertiary'>
                Sign Up
              </Link>
              <Link to='/login' className='btn btn-light'>
                Login
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
