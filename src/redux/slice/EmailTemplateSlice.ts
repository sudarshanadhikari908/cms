import { createSlice } from '@reduxjs/toolkit';
import { IEmailTemplateReducer } from '../../interface/emailTemplate/emailTemplate.interface';
import { getEmailTemplates, getEmailTemplateById } from '../actions/emailTemplateAction';

const initialState: IEmailTemplateReducer = {
  emailTemplateList: null,
  emailDataById: null,
  emailLoading: false,
};

const EmailTemplateSlice = createSlice({
  name: 'email-templates',
  initialState,
  reducers: {},
  extraReducers: {
    [getEmailTemplates.pending.toString()]: (state) => {
      state.emailLoading = true;
    },
    [getEmailTemplates.fulfilled.toString()]: (state, action) => {
      state.emailLoading = false;
      state.emailTemplateList = action.payload;
      state.emailDataById = null;
    },
    [getEmailTemplates.rejected.toString()]: (state) => {
      state.emailLoading = false;
    },
    [getEmailTemplateById.pending.toString()]: (state) => {
      state.emailLoading = true;
    },
    [getEmailTemplateById.fulfilled.toString()]: (state, action) => {
      state.emailLoading = false;
      state.emailDataById = action.payload;
    },
    [getEmailTemplateById.rejected.toString()]: (state) => {
      state.emailLoading = false;
    },
  },
});

export default EmailTemplateSlice.reducer;
