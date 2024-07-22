interface ICustomersProps {
  currentPage: number;
  next: number;
  pageSize: number;
  previous: number;
  results: any;
  totalItems: number;
}

interface ICustomerProps {
  id: number;
  address: string;
  email: string;
  identifier: string;
  referral_code: any;
  referring_url: string;
  referred_by: any;
  referred_users: string[];
  createdAt: any;
  social_links: any;
}

export interface ICustomerReducer {
  customerList: ICustomersProps | null;
  customerData: ICustomerProps | null;
  customerLoading: boolean;
}
