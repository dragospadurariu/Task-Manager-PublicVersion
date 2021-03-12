import axios from 'axios';
import { ADD_LABEL, DELETE_LABEL, GET_ALL_LABELS, UPDATE_LABEL } from './types';
const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getAllLabels = (dashboardId) => async (dispatch) => {
  try {
    const res = await axios.get(`/label/${dashboardId}`);
    dispatch({ type: GET_ALL_LABELS, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addLabel = (name, colorCode, dashboardId) => async (dispatch) => {
  try {
    const res = await axios.post(
      `/label/${dashboardId}`,
      { name, colorCode },
      config
    );
    dispatch({ type: ADD_LABEL, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const updateLabel = (name, id) => async (dispatch) => {
  try {
    const res = await axios.patch(`/label/${id}`, { name }, config);
    dispatch({ type: UPDATE_LABEL, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const deleteLabel = (labelId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/label/${labelId}`, config);
    dispatch({ type: DELETE_LABEL, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
