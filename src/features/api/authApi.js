import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { userLoggedIn } from '../authSlice';


const USER_API = "http://localhost:8080/api/v1/user/";


export const authApi = createApi({
    reducerPath: "authApi",
    baseQuery: fetchBaseQuery({
        baseUrl: USER_API,
        credentials: 'include', // Corrected property name
    }),
    endpoints: (builder) => ({
        registerUser: builder.mutation({
            query: (InputData) => ({
                url: "register",
                method: "POST",
                body: InputData,
            }),
        }),
        loginUser: builder.mutation({
            query: (InputData) => ({
                url: "login",
                method: "POST",
                body: InputData,
            }),
            async onQueryStarted(arg,{queryFulfilled,dispatch}){
                try {
                    const result =await queryFulfilled;
                    dispatch(userLoggedIn({user:result.data.user}))
                } catch (error) {
                    console.log(error);
                    
                }
            }
        }),
    }),
});

// Export hooks for usage in functional components
export const { useRegisterUserMutation, useLoginUserMutation } = authApi;
