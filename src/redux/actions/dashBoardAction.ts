import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

export const getDashBoard = createAsyncThunk<any>('get/dashboard', async () => {
  try {
    const response = await axiosInstance.get(`/dashboard`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
