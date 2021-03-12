import axios from 'axios';
import { handleNotification } from '../components/utils/global.functions';
import { setAlert } from './alert.action';
import {
  ADD_DASHBOARD,
  CHANGE_DASHBOARD_NAME,
  ADD_PARTICIPANTS,
  DELETE_DASHBOARD,
  GET_ALL_DASHBOARDS,
  DELETE_PARTICIPANT,
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
    handleNotification(
      'Deleting dashboard',
      'You must be the dashbord owner in order to delete it',
      'danger'
    );
  }
};

export const addPartipants = (id, email) => async (dispatch) => {
  try {
    const res = await axios.patch(`/dashboards/${id}/user/${email}`);
    dispatch({ type: ADD_PARTICIPANTS, payload: res.data });
  } catch (error) {
    const message = error.response.data.message;
    dispatch(setAlert(message, 'danger'));
  }
};

export const deletePartipant = (dashboardID, userID) => async (dispatch) => {
  try {
    const res = await axios.delete(`/dashboards/${dashboardID}/user/${userID}`);
    dispatch({ type: DELETE_PARTICIPANT, payload: res.data });
  } catch (error) {
    const message = error.response.data.message;
    dispatch(setAlert(message, 'danger'));
  }
};
