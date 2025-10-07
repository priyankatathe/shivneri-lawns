import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react"

export const formApi = createApi({
    reducerPath: "formApi",



    baseQuery: fetchBaseQuery({ baseUrl: `${import.meta.env.VITE_BACKEND_URL}/booking`, credentials: "include" }),
    tagTypes: ["form"],
    endpoints: (builder) => {
        return {
            getBookings: builder.query({
                query: () => {
                    return {
                        url: "/get-booking",
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
            updateBooking: builder.mutation({
                query: userData => {
                    return {
                        url: `/updateBooking/${userData._id}`,
                        method: "PUT",
                        body: userData
                    }
                },
                invalidatesTags: ["form"]
            }),
            deleteBooking: builder.mutation({
                query: (id) => {
                    return {
                        url: `/deleteBooking/${id}`,
                        method: "DELETE"
                    }
                },
                invalidatesTags: ["form"]
            }),

        }
    }
})

export const { useGetBookingsQuery, useCreateBookingMutation, useUpdateBookingMutation, useDeleteBookingMutation } = formApi
