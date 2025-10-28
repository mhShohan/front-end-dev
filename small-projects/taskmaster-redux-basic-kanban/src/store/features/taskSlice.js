import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: []
};

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {
        addTask: (state, { payload }) => {
            state.tasks.push(payload);
        },
        removeTask: (state, { payload }) => {
            state.tasks = state.tasks.filter(task => task.id !== payload);
        },
        updateStatus: (state, { payload }) => {
            const targetTask = state.tasks.find(task => task.id === payload.id);
            targetTask.status = payload.status;
        }
    }
});

export const { addTask, removeTask, updateStatus } = taskSlice.actions;

export default taskSlice.reducer;