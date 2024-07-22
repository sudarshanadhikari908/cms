import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

export const getCustomers = createAsyncThunk<any, any>(
  'get/customer-list',
  async ({ searchTerm, currentPage, pageSize }) => {
    try {
      const response = await axiosInstance.get(
        `/customers?keywords=${searchTerm.trim()}&page=${currentPage}&limit=${pageSize}`,
      );
      return response.data;
    } catch (error) {
      return error.message;
    }
  },
);

export const getCustomerById = createAsyncThunk<any, any>('get/customer', async ({ id }) => {
  try {
    const response = await axiosInstance.get(`/customers/${id}`);
    return response.data;
  } catch (error) {
    return error.message;
  }
});
