import React, { Fragment, useState } from 'react';
import { Link, Redirect } from 'react-router-dom';
import './auth.styles.scss';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLogin } from '../../actions/auth.action';
import Alert from '../layout/alert/alert.layout';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const dispatch = useDispatch();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    dispatch(fetchLogin(formData));
  };

  if (isAuth) {
    return <Redirect to='/home' />;
  }

  return (
    <Fragment>
      <div className='auth-page'>
        <div className='auth-container'>
          <div className='auth-image'></div>
          <div className='auth-box'>
            <h2 className='auth-header'>Sign in</h2>
            <form
              action=''
              className='auth-form padding-top-10'
              onSubmit={(e) => onSubmit(e)}
            >
              {/* {Email Input Input} */}
              <div className='auth-input-container'>
                <input
                  type='text'
                  className='auth-input'
                  placeholder='Email'
                  required={true}
                  name='email'
                  onChange={(e) => onChange(e)}
                />
                <i className='material-icons'>email</i>
              </div>
              {/* {Password Input} */}
              <div className='auth-input-container'>
                <input
                  type='password'
                  className='auth-input'
                  placeholder='Password'
                  required={true}
                  autoComplete='false'
                  name='password'
                  onChange={(e) => onChange(e)}
                />
                <i className='material-icons'>vpn_key</i>
              </div>
              {/* {Submit button} */}
              <div className='auth-submit'>
                <input type='submit' className='btn-auth' value='Sign in' />
              </div>
            </form>

            <div className='not-registered'>
              <span className='not-registered-text'>Not a member? </span>
              <pre></pre>
              <Link to='/register' className='not-registered-link'>
                &nbsp; Sign up now! &nbsp;
              </Link>
            </div>
            <Alert />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Login;
