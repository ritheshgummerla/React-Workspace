// Need to use the React-specific entry point to import createApi
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

// Define a service using a base URL and expected endpoints
export const getUsers = createApi({
  reducerPath: 'getUsers',
  baseQuery: fetchBaseQuery({ baseUrl: 'https://jsonplaceholder.typicode.com' }),
  tagTypes:['users'],
  endpoints: (builder) => ({
    getUserList: builder.query({
      query: () => `/posts`,
      providesTags:['users'],
    }),
    addUser: builder.mutation({
      query: () =>({
        url:'/posts',
        method:'POST',
        body:'user',
      }),
      invalidatesTags:['users'],
    }),
  }),
})
//
//invalidatesTags:['users']
// Export hooks for usage in functional components, which are
// auto-generated based on the defined endpoints
export const { useGetUserListQuery } = getUsers;