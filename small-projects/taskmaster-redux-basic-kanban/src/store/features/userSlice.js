import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    name: 'shohan',
    userTasks: []
};

const userSlice = createSlice({
    name: 'userSlice',
    initialState,
    reducers: {
        addUserTask: (state, { payload }) => {
            if (payload.assignedTo === state.name) {
                state.userTasks.push(payload);
            }
        },
        removeUserTask: (state, { payload }) => {
            state.userTasks = state.userTasks.filter(task => task.id !== payload);
        },
        updateUserTaskStatus: (state, { payload }) => {
            const targetTask = state.userTasks.find(task => task.id === payload);
            targetTask.status = 'COMPLETED';
        }
    }
});

export const { addUserTask, removeUserTask, updateUserTaskStatus } = userSlice.actions;

export default userSlice.reducer;