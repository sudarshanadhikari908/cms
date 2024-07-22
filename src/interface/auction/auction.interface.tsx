interface IAuctionManagement {
  data: any;
  currentPage: number;
  nextPage: number;
  prevPage: number;
  totalPages: number;
  limit: number;
  [x: string]: any;
}

interface IAuctionDataById {
  address: string;
  createdAt: string;
  finalPrice: any;
  floorPrice: string;
  id: number;
  length: string;
  name: string;
  startBlockTime: any;
  status: string;
  totalBidsPlaced: number;
  updatedAt: string;
  nft: any;
}

export interface IAuctionManagementReducer {
  auctionList: IAuctionManagement | null;
  auction: IAuctionDataById | null;
  auctionLoading: boolean;
}
