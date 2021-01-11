import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './auth.styles.scss';

const VerifyEmail = (props) => {
  const { token } = props.match.params;
  const [verified, setVerified] = useState(false);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const fetchVerifyToken = async () => {
      const config = {
        headers: {
          'Content-Type': 'application/json',
        },
      };

      try {
        await axios.get(`/users/signup/activate/${token}`, config);
        setLoaded(true);
        setVerified(true);
      } catch (error) {
        setVerified(false);
        setLoaded(true);
      }
    };
    fetchVerifyToken();
  }, [token]);

  const renderAuthMessage = () => {
    if (!loaded) return null;
    if (verified) {
      return (
        <div className='verify-container verify-container-success'>
          <span className='verify-text'>
            Your account was successfully verified !
          </span>
          <Link to='/login' className='verify-link'>
            Return to login page
          </Link>
        </div>
      );
    } else {
      return (
        <div className='verify-container verify-container-failed'>
          <span className='verify--text'>Something went wrong!</span>
          <Link to='/login' className='verify-link'>
            Return to login page
          </Link>
        </div>
      );
    }
  };

  return (
    <div className='auth-page verify-page'>
      <div className='verify-box'>{renderAuthMessage()}</div>
    </div>
  );
};

export default VerifyEmail;
