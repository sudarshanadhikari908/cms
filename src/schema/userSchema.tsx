import * as yup from 'yup';

export const userSchema = yup.object().shape({
  email: yup
    .string()
    .required('Email is required.')
    .transform((currentValue) => currentValue.trim())
    .email('Enter a valid email address.'),
  firstName: yup
    .string()
    .required('First name is required.')
    .transform((currentValue) => currentValue.trim())
    .matches(/^[a-zA-Z]+$/, 'First name must be only alphabets.')
    .min(2, 'First name must have minimum of 2 characters.')
    .max(16, 'First name cannot be more than 16 characters.'),
  lastName: yup
    .string()
    .required('Last name is required.')
    .transform((currentValue) => currentValue.trim())
    .matches(/^[a-zA-Z]+$/, 'Last name must be only alphabets.')
    .min(2, 'Last name must have minimum of 2 characters.')
    .max(16, 'Last name cannot be more than 16 characters.'),
  contact: yup
    .string()
    .notRequired()
    .matches(/^([0-9]{10,10})?$/, 'Phone number must be 10 digits number'),
  role: yup.string().required('Role is required.'),
  status: yup.string(),
});

export const editProfileSchema = yup.object().shape({
  fname: yup
    .string()
    .required('First name is required.')
    .transform((currentValue) => currentValue.trim())
    .matches(/^[a-zA-Z]+$/, 'First name must be only alphabets.')
    .min(2, 'First name must have minimum of 2 characters.')
    .max(16, 'First name cannot be more than 16 character.'),
  lname: yup
    .string()
    .required('Last name is required.')
    .transform((currentValue) => currentValue.trim())
    .matches(/^[a-zA-Z]+$/, 'Last name must be only alphabets.')
    .min(2, 'Last name must have minimum of 2 characters.')
    .max(16, 'Last name cannot be more than 16 characters.'),
  contact: yup
    .string()
    .notRequired()
    .nullable()
    .matches(/^([0-9]{10,10})?$/, 'Phone number must be 10 digits number'),
});

export const changePasswordSchema = yup.object().shape({
  oldPassword: yup.string().required('Old Password is required.'),
  password: yup.string().required('Please enter your password.').min(6, 'Password must be atleast 6 characters.'),
  confirmPassword: yup
    .string()
    .required('Please enter your Confirm Password.')
    .oneOf([yup.ref('password'), null], "Password didn't match."),
});
