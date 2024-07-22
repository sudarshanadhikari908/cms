import { createAsyncThunk } from '@reduxjs/toolkit';
import axiosInstance from '../../axios/axios';

export const getEmailTemplates = createAsyncThunk<any, any>(
  'get/emailTemplates',
  async ({ searchTerm, currentPage, pageSize }) => {
    try {
      const response = await axiosInstance.get(
        `/email-templates?keywords=${searchTerm.trim()}&page=${currentPage}&limit=${pageSize}`,
      );
      return response.data;
    } catch (error) {
      console.log(error);
    }
  },
);

export const getEmailTemplateById = createAsyncThunk<any, any>('get/emailTemplate/id', async ({ id }) => {
  try {
    const response = await axiosInstance.get(`/email-templates/${id}`);
    return response.data;
  } catch (error) {
    console.log(error);
  }
});
