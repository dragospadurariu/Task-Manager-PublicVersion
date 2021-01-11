import {
  ADD_NEW_COLUMN,
  CLEAR_ALL_COLUMNS,
  GET_COLUMNS_BY_DASHBOARD,
  UPDATE_COLUMN,
  DELETE_COLUMN,
} from '../actions/types';

const initialState = {
  columns: [],
};

const columns = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case GET_COLUMNS_BY_DASHBOARD: {
      return { ...state, columns: payload };
    }

    case CLEAR_ALL_COLUMNS: {
      return { ...state, columns: [] };
    }

    case ADD_NEW_COLUMN: {
      return { ...state, columns: [...state.columns, payload] };
    }

    case UPDATE_COLUMN: {
      return {
        ...state,
        columns: state.columns.map((column) => {
          return column._id === payload._id
            ? { ...column, name: payload.name }
            : column;
        }),
      };
    }

    case DELETE_COLUMN: {
      return {
        ...state,
        columns: state.columns.filter((column) => column._id !== payload._id),
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default columns;
