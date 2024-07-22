interface IEmailTemplate {
  currentPage: number;
  next: number;
  pageSize: number;
  previous: number;
  results: any;
  totalItems: number;
}

interface IEmailDataById {
  title: string;
  sender: string;
  code: string;
  subject: string;
  target: string;
  body: string;
  isDefault: boolean;
}

export interface IEmailTemplateReducer {
  emailTemplateList: IEmailTemplate | null;
  emailDataById: IEmailDataById | null;
  emailLoading: boolean;
}
