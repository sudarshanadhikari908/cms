export interface IDashBoardProps {
  customerCount: number;
  auctionNfts: number;
  freeNfts: number;
  discord: number;
  email: number;
  twitch: number;
  twitter: number;
}

export interface IDashBoardReducer {
  dashBoardData: IDashBoardProps | null;
  dashBoardLoading: boolean;
}
