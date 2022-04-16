import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const pokemonApi = createApi({
    reducerPath: 'pokemonApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'https://randomuser.me/' }),
    endpoints: (builder) => ({
      getAllUsers: builder.query({
        query: () => 'api/?results=500',
        method : 'GET'
      }),
    }),
  })

  export const { useGetAllUsersQuery } = pokemonApi