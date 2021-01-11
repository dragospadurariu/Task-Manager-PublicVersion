import {
  ADD_TASK,
  DELETE_TASK,
  GET_TASKS_BY_DASHBOARD,
  UPDATE_TASK,
  UPDATE_TASK_COMMENTS,
} from '../actions/types';

const initialState = {
  tasks: [],
};

const taskReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_TASK: {
      return { ...state, tasks: [...state.tasks, payload] };
    }

    case GET_TASKS_BY_DASHBOARD: {
      return { ...state, tasks: payload };
    }

    case UPDATE_TASK: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task._id === payload._id) {
            return payload;
          }
          return task;
        }),
      };
    }

    case UPDATE_TASK_COMMENTS: {
      return {
        ...state,
        tasks: state.tasks.map((task) => {
          if (task._id === payload.id) {
            task.comments = payload.comments;
          }
          return task;
        }),
      };
    }

    case DELETE_TASK: {
      return {
        ...state,
        tasks: state.tasks.filter((task) => task._id !== payload._id),
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default taskReducer;
