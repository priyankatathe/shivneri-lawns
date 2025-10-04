import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/auth`, credentials: "include" }),
    tagTypes: ["auth"],
    endpoints: (builder) => {
        return {
            getAdmin: builder.query({
                query: () => {
                    return {
                        url: "/admin-fetch",
                        method: "GET"
                    }
                },
                providesTags: ["auth"],
                transformResponse: data => data.result

            }),
            registerAdmin: builder.mutation({
                query: AdminData => {
                    return {
                        url: "/admin-register",
                        method: "POST",
                        body: AdminData
                    }
                },
                invalidatesTags: ["auth"]
            }),
            loginAdmin: builder.mutation({
                query: AdminData => {
                    return {
                        url: "/admin-login",
                        method: "POST",
                        body: AdminData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.setItem("admin", JSON.stringify(data.result))
                    return data.result
                }
            }),
            logoutAdmin: builder.mutation({
                query: AdminData => {
                    return {
                        url: "/admin-logout",
                        method: "POST",
                        body: AdminData
                    }
                },
                invalidatesTags: ["auth"],
                transformResponse: data => {
                    localStorage.removeItem("admin")
                    return data.result
                }
            }),


            forgotPassword: builder.mutation({
                query: (body) => ({
                    url: "/forgot-password",
                    method: "POST",
                    body
                }),
            }),

            // 🔹 Reset password using OTP
            resetPasswordWithOTP: builder.mutation({
                query: (body) => ({
                    url: "/reset-password-otp",
                    method: "POST",
                    body
                }),
            }),

        }
    }
})

export const {
    useGetAdminQuery,
    useLoginAdminMutation,
    useLogoutAdminMutation,
    useRegisterAdminMutation,
    //reset or forgot
    useForgotPasswordMutation, useResetPasswordWithOTPMutation

} = authApi
