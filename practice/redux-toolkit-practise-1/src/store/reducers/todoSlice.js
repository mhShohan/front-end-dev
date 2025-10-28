import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';


const initialState = {
    isLoading: true,
    todos: [],
    error: null
};


export const fetchTodos = createAsyncThunk('todos/fetchTodos', (async (id) => {
    try {
        const res = await axios.get(`https://jsonplaceholder.typicode.com/todos?userId=${id}`);
        return res.data;
    } catch (error) {
        throw new Error('Failed to fetch todos');
    }
}));


const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(fetchTodos.pending, (state) => {
            state.isLoading = true;
        }).addCase(fetchTodos.fulfilled, (state, action) => {
            state.isLoading = false;
            state.todos = action.payload;
        }).addCase(fetchTodos.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        });
    }
});


export default todoSlice.reducer;