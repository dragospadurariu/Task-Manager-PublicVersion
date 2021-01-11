import React, { Fragment, useState } from 'react';
import { Link } from 'react-router-dom';
import './auth.styles.scss';
import { setAlert } from '../../actions/alert.action';
import { fetchRegister } from '../../actions/auth.action';
import validator from 'validator';
import { useDispatch } from 'react-redux';
import Alert from '../layout/alert/alert.layout';

const Register = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;
  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async (e) => {
    e.preventDefault();
    let isValid = true;

    if (name === null || name === '') {
      dispatch(setAlert('The name is mandatory!', 'danger'));
      isValid = false;
    }

    if (password.length < 6 || password2.length < 6) {
      dispatch(
        setAlert('The password should have at least 6 characters!', 'danger')
      );
      isValid = false;
    }

    if (password !== password2) {
      dispatch(setAlert('Password does not match !', 'danger'));
      isValid = false;
    }

    if (!validator.isEmail(email)) {
      dispatch(
        setAlert(
          'Please enter your email address in format yourname@example.com',
          'danger'
        )
      );
      isValid = false;
    }

    if (isValid) {
      dispatch(fetchRegister(formData));
    }
  };

  return (
    <Fragment>
      <div className='auth-page'>
        <div className='auth-container'>
          <div className='auth-image'></div>
          <div className='auth-box'>
            <h2 className='auth-header'>Register</h2>
            <form action='' className='auth-form' onSubmit={(e) => onSubmit(e)}>
              {/* {Name Input} */}
              <div className='auth-input-container'>
                <input
                  type='text'
                  className='auth-input'
                  placeholder='Name'
                  required={true}
                  // value={name}
                  name='name'
                  onChange={(e) => onChange(e)}
                />
                <i className='material-icons'>person</i>
              </div>
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
              {/* {Password2 Input} */}
              <div className='auth-input-container'>
                <input
                  type='password'
                  className='auth-input'
                  placeholder='Confirm Password'
                  required={true}
                  name='password2'
                  onChange={(e) => onChange(e)}
                />
                <i className='material-icons'>vpn_key</i>
              </div>
              {/* {Submit button} */}
              <div className='auth-submit'>
                <input type='submit' className='btn-auth' value='Register' />
              </div>
            </form>
            <div className='not-registered'>
              <span className='not-registered-text'>
                Already have an account?{' '}
              </span>
              <pre></pre>
              <Link to='/login' className='not-registered-link'>
                &nbsp; Sign in now! &nbsp;
              </Link>
            </div>
            <Alert />
          </div>
        </div>
      </div>
    </Fragment>
  );
};

export default Register;
