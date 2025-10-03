import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const ContactSlice = createApi({
    reducerPath: "api",
    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/form`, credentials: "include" }),
    tagTypes: ["form"],
    endpoints: (builder) => {
        return {
            getUsers: builder.query({
                query: () => {
                    return {
                        url: "/apiEndPoint",
                        method: "GET"
                    }
                },
                providesTags: ["form"]
            }),
            createBooking: builder.mutation({
                query: userData => {
                    return {
                        url: "/bookings",
                        method: "POST",
                        body: userData
                    }
                },
                invalidatesTags: ["form"]
            }),

        }
    }
})

export const { useGetUsersQuery, useCreateBookingMutation } = ContactSlice
