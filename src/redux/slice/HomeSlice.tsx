/* eslint-disable no-debugger */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { request } from '../../services/http/Http';
const BASE_URL = import.meta.env.VITE_REACT_APP_API_URL;

export interface HomeState {
  data: any;
  isManager:any;
  isEmployer:any;
}

const initialState: HomeState = {
  data:[],
  isManager:false,
  isEmployer:false,
};

export const homeSlice = createSlice({
  name: 'details',
  initialState,
  reducers: {
    initialLoad: (state, action) => {
      state.data = action.payload;
    }
  },
  extraReducers:(builder)=> {
      builder
      .addCase(getUserDetails.fulfilled, (state, action) =>{
        state.data =action.payload;
      })
  },
});

export const { initialLoad } = homeSlice.actions;

export default homeSlice.reducer;

export const getUserDetails = createAsyncThunk('user/details', async () =>{
    // const data= await fetch('data/user.json')
    // const data= await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/posts`)
    return await request(`${BASE_URL}/posts`, 'GET', {}).then((response) => {
      if (response) {
        return response;
      }
    });
    // const data= await fetch(`${import.meta.env.VITE_REACT_APP_API_URL}/products`)
    // const result = await data.json();
    // return result;
})
