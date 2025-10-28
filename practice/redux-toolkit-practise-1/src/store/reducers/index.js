import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
import todoReducer from './todoSlice';
import taskReducer from './taskSlice';

const rootReducer = combineReducers({
    users: usersReducer,
    todos: todoReducer,
    tasks: taskReducer
});

export default rootReducer;
