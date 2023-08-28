import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./features/taskSlice";
import userSlice from "./features/userSlice";

const store = configureStore({
    reducer: {
        taskSlice,
        userSlice
    }
});

export default store;