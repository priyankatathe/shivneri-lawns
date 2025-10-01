import { createSlice } from "@reduxjs/toolkit";
import { authApi } from "../api/authApi";

const authSlice = createSlice({
    name: "authSlice",
    initialState: {
        admin: JSON.parse(localStorage.getItem("admin")),
    },
    reducers: {
        adminLogout: (state, { payload }) => {
            localStorage.removeItem("admin")
            state.admin = null
        }
    },
    extraReducers: builder => builder
        .addMatcher(authApi.endpoints.loginAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = payload
            localStorage.setItem("admin", JSON.stringify(payload))

        })
        .addMatcher(authApi.endpoints.logoutAdmin.matchFulfilled, (state, { payload }) => {
            state.admin = null
        })



})

export const {
    adminLogout
} = authSlice.actions
export default authSlice.reducer