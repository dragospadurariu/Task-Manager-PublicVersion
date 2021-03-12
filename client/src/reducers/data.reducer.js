import {
  ADD_DASHBOARD,
  CHANGE_DASHBOARD_NAME,
  DELETE_DASHBOARD,
  ADD_PARTICIPANTS,
  DELETE_PARTICIPANT,
  GET_ALL_DASHBOARDS,
} from '../actions/types';

const initialState = {
  dashboards: [],
};

const data = (state = initialState, action) => {
  const { type, payload } = action;

  switch (type) {
    case ADD_DASHBOARD: {
      return { ...state, dashboards: [...state.dashboards, payload] };
    }

    case GET_ALL_DASHBOARDS: {
      return { ...state, dashboards: payload };
    }

    case CHANGE_DASHBOARD_NAME: {
      return {
        ...state,
        dashboards: state.dashboards.map((dashboard) => {
          return dashboard._id === payload._id
            ? { ...dashboard, name: payload.name }
            : dashboard;
        }),
      };
    }

    case DELETE_DASHBOARD: {
      return {
        ...state,
        dashboards: state.dashboards.filter(
          (dashboard) => dashboard._id !== payload.id
        ),
      };
    }

    case ADD_PARTICIPANTS:
    case DELETE_PARTICIPANT: {
      return {
        ...state,
        dashboards: state.dashboards.map((dashboard) =>
          dashboard._id === payload._id ? payload : dashboard
        ),
      };
    }

    default: {
      return { ...state };
    }
  }
};

export default data;
