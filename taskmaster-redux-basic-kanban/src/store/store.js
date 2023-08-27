import { configureStore } from "@reduxjs/toolkit";
import taskSlice from "./features/taskSlice";

const store = configureStore({
    reducer: {
        task: taskSlice
    }
});

export default store;