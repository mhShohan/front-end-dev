import { combineReducers } from '@reduxjs/toolkit';
import usersReducer from './userSlice';
import todoReducer from './todoSlice';

const rootReducer = combineReducers({
    users: usersReducer,
    todos: todoReducer
});

export default rootReducer;
