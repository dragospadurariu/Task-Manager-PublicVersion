import { combineReducers } from 'redux';
import alert from './alert.reducer';
import auth from './auth.reducer';
import columns from './columns.reducer';
import data from './data.reducer';
import taskReducer from './task.reducer';
import labelReducer from './label.reducer';

const rootReducer = combineReducers({
  alert,
  auth,
  data,
  columns,
  taskReducer,
  labelReducer,
});
export default rootReducer;
