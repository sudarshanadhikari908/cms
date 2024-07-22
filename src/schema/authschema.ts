import * as yup from 'yup';

// Validation for user registration
export const registerSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address.').required('Email is required.'),
  username: yup.string().required('Username is required.'),
  password: yup.string().required('Password is required.').min(4),
  name: yup.string().required('Name is required.'),
});

export const loginSchema = yup.object().shape({
  email: yup.string().required('Email is required.').email('Please enter a valid email address.'),
  password: yup.string().required('Password is required.'),
});

export const forgetPasswordSchema = yup.object().shape({
  email: yup.string().email('Please enter a valid email address.').required('Email is required.'),
});

export const resetCodeSchema = yup.object().shape({
  password: yup.string().required('Please enter your password.').min(6, 'Password must be at least 6 characters.'),
  confirmPassword: yup
    .string()
    .required('Please enter your Confirm Password.')
    .oneOf([yup.ref('password'), null], "Password didn't match."),
});
