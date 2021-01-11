import axios from 'axios';
import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASKS_BY_DASHBOARD,
  UPDATE_TASK,
  UPDATE_TASK_COMMENTS,
} from './types';

const config = {
  headers: {
    'Content-Type': 'application/json',
  },
};

export const getTasksByDashboard = (dashboardID) => async (dispatch) => {
  try {
    const res = await axios.get(`/task/dashboard/${dashboardID}`);
    dispatch({ type: GET_TASKS_BY_DASHBOARD, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addNewTask = (columnID, name) => async (dispatch) => {
  const body = JSON.stringify({ name });
  try {
    const res = await axios.post(`/task/column/${columnID}`, body, config);
    console.log('RETURN VALUE: ', res.data);
    dispatch({ type: ADD_TASK, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};

export const addTaskComment = (taskId, text) => async (dispatch) => {
  const body = JSON.stringify({ text });
  try {
    const res = await axios.post(`/task/comments/${taskId}`, body, config);
    dispatch({
      type: UPDATE_TASK_COMMENTS,
      payload: { id: taskId, comments: res.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTaskCommentAction = (taskId, commentId) => async (
  dispatch
) => {
  try {
    const res = await axios.delete(`/task/comments/${taskId}/${commentId}`);
    dispatch({
      type: UPDATE_TASK_COMMENTS,
      payload: { id: taskId, comments: res.data },
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateTask = (taskId, updatedTask) => async (dispatch) => {
  const body = JSON.stringify(updatedTask);
  try {
    const res = await axios.patch(`/task/${taskId}`, body, config);
    dispatch({
      type: UPDATE_TASK,
      payload: res.data,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteTaskAction = (taskId) => async (dispatch) => {
  try {
    const res = await axios.delete(`/task/${taskId}`, config);
    dispatch({ type: DELETE_TASK, payload: res.data });
  } catch (error) {
    console.log(error);
  }
};
