// store/reducers/usersSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    users: [],
    isLoading: true,
    error: null,
};

// Async thunk to fetch users from the API
export const fetchUsers = createAsyncThunk('users/fetchUsers', async (id) => {
    try {
        const response = await axios.get(`https://jsonplaceholder.typicode.com/users?id=${id}`);
        return response.data;
    } catch (error) {
        throw new Error('Failed to fetch users');
    }
});

const usersSlice = createSlice({
    name: 'users',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(fetchUsers.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchUsers.fulfilled, (state, action) => {
                state.isLoading = false;
                state.users = action.payload;
            })
            .addCase(fetchUsers.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message;
            });
    },
});

export default usersSlice.reducer;
