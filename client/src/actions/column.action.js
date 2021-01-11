import axios from 'axios';
import {
  ADD_NEW_COLUMN,
  DELETE_COLUMN,
  GET_COLUMNS_BY_DASHBOARD,
  UPDATE_COLUMN,
} from './types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getColumnsByDashboardID = (dashboardID) => async (dispatch) => {
  try {
    const res = await axios.get(`/columns/dashboard/${dashboardID}`);
    dispatch({ type: GET_COLUMNS_BY_DASHBOARD, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addColumn = (dashboardID, name) => async (dispatch) => {
  const body = JSON.stringify({ name });
  try {
    const res = await axios.post(`/columns/${dashboardID}`, body, config);
    dispatch({ type: ADD_NEW_COLUMN, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateColumn = (name, id) => async (dispatch) => {
  const body = JSON.stringify({ name });
  try {
    const res = await axios.patch(`/columns/${id}`, body, config);
    dispatch({ type: UPDATE_COLUMN, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteColumn = (id) => async (dispatch) => {
  try {
    const res = await axios.delete(`/columns/${id}`);
    dispatch({ type: DELETE_COLUMN, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
