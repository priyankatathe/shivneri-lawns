import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./api/authApi";
import { formApi } from "./api/formApi";
import authSlice from "./slice/authSlice";


const reduxStore = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [formApi.reducerPath]: formApi.reducer,
        auth: authSlice
    },
    middleware: def => [...def(), authApi.middleware, formApi.middleware]
})

export default reduxStore