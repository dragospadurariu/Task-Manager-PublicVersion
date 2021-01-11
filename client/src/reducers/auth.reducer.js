import {
  AUTH_ERROR,
  LOAD_USER,
  LOGIN_FAIL,
  LOGIN_SUCCESS,
  LOG_OUT,
  REGISTER_FAIL,
  REGISTER_SUCCESS,
  USER_IS_LOADING,
} from '../actions/types';

const initialState = {
  token: localStorage.getItem('token'),
  isAuthenticated: null,
  loading: true,
  registered: false,
  user: null,
};

const auth = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case REGISTER_SUCCESS: {
      return { ...state, loading: false, registered: true };
    }

    case REGISTER_FAIL: {
      return { ...state, loading: false, registered: true };
    }

    case USER_IS_LOADING: {
      return {
        ...state,
        loading: action.payload,
      };
    }

    case LOGIN_SUCCESS:
    case LOAD_USER:
      localStorage.setItem('token', payload.token);
      return {
        ...state,
        user: payload.user,
        token: payload.token,
        isAuthenticated: true,
        loading: false,
        registered: true,
      };

    case LOGIN_FAIL:
    case LOG_OUT:
    case AUTH_ERROR:
      localStorage.removeItem('token');
      return {
        ...state,
        token: null,
        isAuthenticated: false,
        loading: false,
      };

    default: {
      return state;
    }
  }
};

export default auth;
