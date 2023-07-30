import { createSlice } from '@reduxjs/toolkit';


const initialState = {
    isLoading: true,
    tasks: [],
    error: null
};



const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        add: (state, action) => {
            state.isLoading = false;
            state.tasks.push(action.payload);
        },
        remove: (state, action) => {
            state.isLoading = false;
            state.tasks = state.tasks.filter((item) => item.id !== action.payload);
        }
    },
});

export const { add, remove } = taskSlice.actions;

export default taskSlice.reducer;