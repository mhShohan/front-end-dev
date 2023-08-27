import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    tasks: []
};

const taskSlice = createSlice({
    name: 'taskSlice',
    initialState,
    reducers: {}
});

export default taskSlice.reducer;