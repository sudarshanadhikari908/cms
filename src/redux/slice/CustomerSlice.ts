import { createSlice } from '@reduxjs/toolkit';
import { ICustomerReducer } from '../../interface/customer/customer.interface';
import { getCustomerById, getCustomers } from '../actions/customerAction';

const initialState: ICustomerReducer = {
  customerList: null,
  customerData: null,
  customerLoading: false,
};

const CustomerSlice = createSlice({
  name: 'customer',
  initialState,
  reducers: {},
  extraReducers: {
    [getCustomers.pending.toString()]: (state) => {
      state.customerLoading = true;
    },
    [getCustomers.fulfilled.toString()]: (state, action) => {
      state.customerLoading = false;
      state.customerList = action.payload;
    },
    [getCustomers.rejected.toString()]: (state) => {
      state.customerLoading = false;
    },
    [getCustomerById.pending.toString()]: (state) => {
      state.customerLoading = true;
    },
    [getCustomerById.fulfilled.toString()]: (state, action) => {
      state.customerLoading = false;
      state.customerData = action.payload;
    },
    [getCustomerById.rejected.toString()]: (state) => {
      state.customerLoading = false;
    },
  },
});

export default CustomerSlice.reducer;
