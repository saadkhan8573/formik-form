import {createReducer} from '@reduxjs/toolkit';

const initialState = {};

export const loginReducer = createReducer(initialState,{
    login:(state,action)=> {
        if(action.payload.email === 'admin@gmail.com' && action.payload.password === 'pass12345'){
            state.message = "Login Successfully";
        }else{
            state.error = "Invalid Login Details";
        }
    },
    userData : (state,action) => {
        state.user = action.payload
    },
    clearErrors : (state) => {
        state.message = "";
        state.error = "";
    }
})