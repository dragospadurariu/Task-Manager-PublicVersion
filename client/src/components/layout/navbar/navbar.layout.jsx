import React, { Fragment, useState, useRef, useEffect } from 'react';
import './navbar.styles.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import 'tippy.js/dist/tippy.css';
import Tippy from '@tippyjs/react';

import { fetchLogout } from '../../../actions/auth.action';
import ToolTipComponent from '../../utils/tooltip.component';

export const Navbar = () => {
  const { isAuthenticated, loading } = useSelector((state) => state.auth);
  const [showNotificationDropdown, setShowNotificationDropdown] = useState(
    false
  );
  const dispatch = useDispatch();
  const notificationContainer = useRef();
  const [notifications, setNotications] = useState([
    { message: 'Welcome to Task Manager', id: 1, read: true },
  ]);

  const handleClickOutside = (e) => {
    if (
      notificationContainer.current &&
      notificationContainer.current.contains(e.target)
    ) {
      return;
    }

    setShowNotificationDropdown(false);
  };

  useEffect(() => {
    if (showNotificationDropdown) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotificationDropdown]);

  const authLinks = (
    <Fragment>
      <h1 style={{ marginRight: 'auto' }}>
        <Link to='/'>Task Tracker</Link>
      </h1>
      <div className='notification-container' ref={notificationContainer}>
        <span
          className='icon-material'
          style={{ fontSize: '3rem' }}
          onClick={() => setShowNotificationDropdown((prevState) => !prevState)}
        >
          <ToolTipComponent text='Notifications'>
            <span>circle_notifications</span>
          </ToolTipComponent>
        </span>

        {showNotificationDropdown && (
          <div className='notification-nav'>
            <div className='notification-nav-dropdown'>
              <span className='notification-nav-dropdown-title'>
                Notications
              </span>
              {notifications.map((notifaction) => {
                return (
                  <span
                    key={notifaction.id}
                    className='notification-nav-row'
                    style={
                      notifaction.read ? null : { backgroundColor: '#43464b' }
                    }
                    onClick={() =>
                      setNotications(
                        notifications.map((not) =>
                          not.id === notifaction.id
                            ? { ...not, read: true }
                            : not
                        )
                      )
                    }
                  >
                    {notifaction.message}
                  </span>
                );
              })}
            </div>
          </div>
        )}
      </div>
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
