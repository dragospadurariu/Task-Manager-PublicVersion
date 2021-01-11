import React, { Fragment } from 'react';
import './navbar.styles.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { fetchLogout } from '../../../actions/auth.action';

export const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const authLinks = (
    <Fragment>
      <h1>
        <Link to='/'>Task Tracker</Link>
      </h1>
      <a
        onClick={() => dispatch(fetchLogout())}
        href='#!'
        className='a-container'
      >
        <span style={{ fontFamily: 'Material Icons' }}>exit_to_app</span>
        <span>Logout</span>
      </a>
    </Fragment>
  );

  const guessLinks = (
    <Fragment>
      <h1>
        <Link to='/'>Task Tracker</Link>
      </h1>
      <ul>
        <li>
          <Link to='/register'>Register</Link>
        </li>
        <li>
          <Link to='/login'>Login</Link>
        </li>
      </ul>
    </Fragment>
  );

  return (
    <nav className='navbar bg-dark'>
      {!loading && (isAuthenticated ? authLinks : guessLinks)}
    </nav>
  );
};

export default Navbar;
