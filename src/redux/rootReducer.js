import {combineReducers} from 'redux';
import taskReducer from './task/taskReducer';

const rootReducer = combineReducers({
  task: taskReducer,
});

export default rootReducer;
