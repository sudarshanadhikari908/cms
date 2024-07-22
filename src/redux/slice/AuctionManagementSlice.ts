import { createSlice } from '@reduxjs/toolkit';
import { getAuctionData, getAuctionById } from '../actions/auctionAction';

const initialState: any = {
  auctionList: null,
  auctionLoading: false,
  auction: null,
};

const AuctionManagementSlice = createSlice({
  name: 'auctions',
  initialState,
  reducers: {},
  extraReducers: {
    [getAuctionData.pending.toString()]: (state) => {
      state.auctionLoading = true;
    },
    [getAuctionData.fulfilled.toString()]: (state, action) => {
      state.auctionLoading = false;
      state.auctionList = action.payload;
      state.auction = null;
    },
    [getAuctionData.rejected.toString()]: (state) => {
      state.auctionLoading = false;
    },
    [getAuctionById.pending.toString()]: (state) => {
      state.auctionLoading = true;
    },
    [getAuctionById.fulfilled.toString()]: (state, action) => {
      state.auctionLoading = false;
      state.auction = action.payload;
      state.auctionList = null;
    },
    [getAuctionById.rejected.toString()]: (state) => {
      state.auctionLoading = false;
    },
  },
});

export default AuctionManagementSlice.reducer;
