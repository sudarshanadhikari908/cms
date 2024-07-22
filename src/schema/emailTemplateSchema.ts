import * as yup from 'yup';

export const editEmailSchema = yup.object().shape({
  title: yup
    .string()
    .transform((currentValue) => currentValue.trim())
    .min(3, 'Title must be atleast 3 characters.')
    .max(128, 'Title should not exceed 128 characters.')
    .matches(/^[a-zA-Z0-9\s]+$/, 'Title must not contain special characters'),
  subject: yup
    .string()
    .transform((currentValue) => currentValue.trim())
    .min(3, 'Subject must be atleast 3 characters.')
    .max(256, 'Subject should not exceed 256 characters.'),
});
