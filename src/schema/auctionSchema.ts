import * as yup from 'yup';

export const auctionSchema = yup.object().shape({
  name: yup
    .string()
    .transform((currentValue) => currentValue.trim())
    .required('Auction name is required.')
    .min(3, 'Auction name must be atleast 3 characters.')
    .max(32, 'Auction name should not exceed 32 characters.')
    .matches(/^[a-zA-Z ]+$/, 'Auction name must contain letters and space in between only.'),
  length: yup
    .number()
    .required('Auction length is required.')
    .integer('Auction length must be number.')
    .typeError('Auction length must be a number.')
    .min(2, 'Auction length must be atleast 2 hrs.')
    .max(24, 'Auction length must not be greater than 24 hrs.')
    .nullable(false),
  floorPrice: yup
    .string()
    .transform((currentValue) => currentValue.trim())
    .required('Base price is required.')
    .matches(/^(?![0]{2})[0-9]*(\.[0-9]{0,18})?$/, 'Invalid number format')
    .matches(/^[0-9]*(\.[0-9]{0,18})?$/, 'Base price must be a number. Supported with maximum 18 decimal places.'),
  startTime: yup
    .date()
    .required('Start Time is required.')
    .min(new Date(), 'Start time must be greater than current time.')
    .typeError('Start Time is required.'),
  nftName: yup
    .string()
    .transform((currentValue) => currentValue.trim())
    .required('NFT name is required.')
    .min(3, 'NFT name must be atleast 3 characters.')
    .max(32, 'NFT name should not exceed 32 characters.')
    .matches(/^[a-zA-Z ]+$/, 'NFT name must contain letters and space only.'),
  nftSymbol: yup
    .string()
    .transform((currentValue) => currentValue.trim())
    .required('NFT symbol is required.')
    .min(3, 'NFT symbol must be atleast 3 characters.')
    .max(32, 'NFT symbol should not exceed 32 characters.')
    .matches(/^[A-Za-z ]+$/, 'NFT symbol must contain letters only.'),
  totalSupply: yup
    .number()
    .required('Total supply is required.')
    .integer('Total supply must be number.')
    .typeError('Total supply must be number.')
    .min(10, 'Total supply cannot be less than 10.')
    .max(3000, 'Total supply cannot be greater than 3000.'),
  baseURI: yup
    .string()
    .transform((currentValue) => currentValue.trim())
    .required('NFT BASE URI is required.')
    .matches(/^(https:\/\/)[\w.-]+(?:\.[\w.-]+)+[\w\-\\._~:/?#[\]@!\\$&'\\(\\)\\*\\+,;=.]+$/, 'Invalid base URI'),
});

export const editAuctionSchema = yup.object().shape({
  name: yup
    .string()
    .transform((currentValue) => currentValue.trim())
    .max(32, 'Auction name should not exceed 32 characters.')
    .min(3, 'Auction name must be atleast 3 characters.')
    .required('Auction name is required.')
    .matches(/^[a-zA-Z ]+$/, 'Auction name must contain letters and space in between only.'),
  length: yup
    .number()
    .required('Auction length is required.')
    .integer('Auction length must be number.')
    .typeError('Auction length must be a number.')
    .min(2, 'Auction length must be atleast 2 hrs.')
    .max(24, 'Auction length must not be greater than 24 hrs.')
    .nullable(false),
  floorPrice: yup
    .string()
    .transform((currentValue) => currentValue.trim())
    .required('Base price is required.')
    .matches(/^[0-9]*(\.[0-9]{0,18})?$/, 'Base price must be a number. Supported with maximum 18 decimal places.'),

  // startTime: yup
  //   .date()
  //   .required('Start Time is required.')
  //   .min(new Date(), 'Start time must be greater than current time.'),
});
