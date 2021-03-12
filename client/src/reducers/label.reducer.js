import {
  ADD_LABEL,
  DELETE_LABEL,
  GET_ALL_LABELS,
  UPDATE_LABEL,
} from '../actions/types';

const initialState = {
  labels: [],
};

const labelReducer = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case GET_ALL_LABELS: {
      return { ...state, labels: payload };
    }

    case ADD_LABEL: {
      return { ...state, labels: [...state.labels, payload] };
    }

    case UPDATE_LABEL: {
      return {
        ...state,
        labels: state.labels.map((task) => {
          if (task._id === payload._id) {
            return payload;
          }
          return task;
        }),
      };
    }

    case DELETE_LABEL: {
      return {
        ...state,
        labels: state.labels.filter((label) => label._id !== payload._id),
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default labelReducer;
