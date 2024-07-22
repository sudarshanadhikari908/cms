import { createAsyncThunk } from '@reduxjs/toolkit';

import axiosInstance from '../../axios/axios';

export const getAuctionData = createAsyncThunk<any, any>(
  'auctions/getAuctions',
  async ({ currentPage, pageSize, searchTerm, searchStatus }) => {
    const response = await axiosInstance.get(
      `/auctions?keywords=${searchTerm.trim()}&status=${searchStatus}&page=${currentPage}&limit=${pageSize}`,
    );
    return response.data;
  },
);

export const createAuction = createAsyncThunk<any, any>(
  'auctions/createAuctions',
  async ({ auctionName, length, floorPrice, nftName, nftSymbol, totalSupply, baseURI }, { rejectWithValue }) => {
    const response = await axiosInstance.post('/auctions', {
      auctionName,
      length,
      floorPrice,
      nftName,
      symbol: nftSymbol,
      totalSupply,
      baseUri: baseURI,
    });
    return response.data;
  },
);

export const getAuctionById = createAsyncThunk<any, any>('auctions/getAuctionById', async ({ id }) => {
  const response = await axiosInstance.get(`/auctions/${id}`);
  return response.data;
});

export const editAuction = createAsyncThunk<any, any>(
  'auctions/editAuction',
  async ({ id, name, length, floorPrice }) => {
    const response = await axiosInstance.put(`/auctions/${id}`, {
      name,
      length,
      floorPrice,
    });
    return response.data;
  },
);

export const openAuction = createAsyncThunk<any, any>('auctions/startAuction', async ({ auctionId }) => {
  return await axiosInstance.post(`/auctions/${auctionId}/start`);
});
