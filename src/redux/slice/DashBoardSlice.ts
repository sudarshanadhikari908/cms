import { createSlice } from '@reduxjs/toolkit';
import { IDashBoardReducer } from '../../interface/dashboard/dashboard.interface';
import { getDashBoard } from '../actions/dashBoardAction';

const initialState: IDashBoardReducer = {
  dashBoardData: null,
  dashBoardLoading: false,
};

const DashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {},
  extraReducers: {
    [getDashBoard.pending.toString()]: (state) => {
      state.dashBoardLoading = true;
    },
    [getDashBoard.fulfilled.toString()]: (state, action) => {
      state.dashBoardLoading = false;
      state.dashBoardData = action.payload;
    },
    [getDashBoard.rejected.toString()]: (state) => {
      state.dashBoardLoading = false;
    },
  },
});

export default DashboardSlice.reducer;
