export default {
  abi: [
    {
      inputs: [
        {
          internalType: 'address',
          name: '_owner',
          type: 'address',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'auctionAddress',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'string',
          name: 'auctionName',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint8',
          name: 'length',
          type: 'uint8',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'startingPriceInWeii',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'startTime',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'nftTotalSupply',
          type: 'uint256',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'nftAddress',
          type: 'address',
        },
      ],
      name: 'AuctionCreated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'previousOwner',
          type: 'address',
        },
        {
          indexed: true,
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'OwnershipTransferred',
      type: 'event',
    },
    {
      inputs: [
        {
          components: [
            {
              internalType: 'string',
              name: 'auctionName_',
              type: 'string',
            },
            {
              internalType: 'uint8',
              name: 'length_',
              type: 'uint8',
            },
            {
              internalType: 'uint256',
              name: 'startingPriceInWeii_',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'startTime_',
              type: 'uint256',
            },
          ],
          internalType: 'struct AuctionArgs.AuctionProps',
          name: 'auctionArgs',
          type: 'tuple',
        },
        {
          components: [
            {
              internalType: 'string',
              name: 'name_',
              type: 'string',
            },
            {
              internalType: 'string',
              name: 'symbol_',
              type: 'string',
            },
            {
              internalType: 'uint128',
              name: 'totalSupply_',
              type: 'uint128',
            },
            {
              internalType: 'string',
              name: 'baseURI_',
              type: 'string',
            },
          ],
          internalType: 'struct NFTArgs.NFTProps',
          name: 'nftArgs',
          type: 'tuple',
        },
        {
          internalType: 'address',
          name: 'auctionOwner',
          type: 'address',
        },
      ],
      name: 'createAuction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getAllNFTAuctions',
      outputs: [
        {
          internalType: 'contract NFTAuction[]',
          name: '',
          type: 'address[]',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'getLastAuction',
      outputs: [
        {
          internalType: 'contract NFTAuction',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'owner',
      outputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'renounceOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'newOwner',
          type: 'address',
        },
      ],
      name: 'transferOwnership',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
  ],

  address: import.meta.env.VITE_CONTRACT_ADDRESS,
};
