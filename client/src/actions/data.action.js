import axios from 'axios';
import { setAlert } from './alert.action';
import {
  ADD_DASHBOARD,
  CHANGE_DASHBOARD_NAME,
  DELETE_DASHBOARD,
  GET_ALL_DASHBOARDS,
} from './types';

export const addDashboard = (name) => async (dispatch) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };

  const body = JSON.stringify({ name });
  try {
    const res = await axios.post('/dashboards', body, config);
    dispatch({ type: ADD_DASHBOARD, payload: res.data });
  } catch (error) {
    return dispatch(setAlert('Something went wrong.', 'danger'));
  }
};

export const getDashboards = () => async (dispatch) => {
  try {
    const res = await axios.get('/dashboards');
    dispatch({ type: GET_ALL_DASHBOARDS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const changeDashboardName = (name, id) => async (dispatch) => {
  const body = JSON.stringify({ name });
  const config = {
    headers: {
      'Content-Type': 'application/json',
    },
  };
  try {
    const res = await axios.patch(`/dashboards/${id}`, body, config);
    dispatch({ type: CHANGE_DASHBOARD_NAME, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteDashboard = (id) => async (dispatch) => {
  try {
    await axios.delete(`/dashboards/${id}`);
    dispatch({ type: DELETE_DASHBOARD, payload: { id } });
  } catch (error) {
    console.log(error);
  }
};
