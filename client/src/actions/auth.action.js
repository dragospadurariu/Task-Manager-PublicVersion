import axios from 'axios';
import { setAuthToken } from '../components/utils/authToken';
import { setAlert } from './alert.action';
import {
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_IS_LOADING,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  LOAD_USER,
  AUTH_ERROR,
} from './types';

//User is loading
export const userIsLoading = (isLoaded) => {
  return {
    type: USER_IS_LOADING,
    payload: isLoaded,
  };
};

//Load User

export const loadUser = (token) => async (dispatch) => {
  try {
    const res = await axios.get('/users/me');
    const data = {
      user: res.data,
      token,
    };
    dispatch({
      type: LOAD_USER,
      payload: data,
    });
  } catch (error) {
    dispatch({
      type: AUTH_ERROR,
    });
  }
};

//Register User
export const fetchRegister = (formData) => async (dispatch) => {
  const { name, email, password } = formData;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name, email, password });
  try {
    await axios.post('/users/signup', body, config);
    dispatch({ type: REGISTER_SUCCESS });
    dispatch(
      setAlert(
        'Register success. Please check your email to verify your account',
        'success',
        10000
      )
    );
  } catch (error) {
    const errors = error.response.data.message;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error, 'danger'));
      });
    }
    dispatch({ type: REGISTER_FAIL });
    return;
  }
};

//Login User
export const fetchLogin = (formData) => async (dispatch) => {
  const { email, password } = formData;
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ email, password });
  try {
    const res = await axios.post('/users/login', body, config);
    dispatch(userIsLoading(true));
    dispatch({ type: LOGIN_SUCCESS, payload: res.data });
    setAuthToken(localStorage.token);
  } catch (error) {
    const errors = error.response.data.message;
    if (errors) {
      errors.forEach((error) => {
        dispatch(setAlert(error, 'danger'));
      });
    }
    dispatch({ type: LOGIN_FAIL });
    return;
  }
};

//Logout  / Clear profile
export const fetchLogout = () => async (dispatch) => {
  dispatch({ type: LOG_OUT });
  try {
    await axios.post('/users/logout');
  } catch (error) {}
};
