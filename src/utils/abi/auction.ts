export default {
  abi: [
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
      ],
      stateMutability: 'nonpayable',
      type: 'constructor',
    },
    {
      anonymous: false,
      inputs: [],
      name: 'AuctionClosed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'uint256',
          name: 'auctionOpenTime',
          type: 'uint256',
        },
      ],
      name: 'AuctionOpened',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'string',
          name: '_auctionName',
          type: 'string',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_startingPriceInWeii',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: '_length',
          type: 'uint256',
        },
      ],
      name: 'AuctionUpdated',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'bidder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'quantity',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'unitPrice',
          type: 'uint256',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'totalBidBalance',
          type: 'uint256',
        },
      ],
      name: 'BidPlaced',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'bidder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256[]',
          name: 'tokenIds',
          type: 'uint256[]',
        },
      ],
      name: 'NFTClaimed',
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
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'auctionOpened',
          type: 'bool',
        },
      ],
      name: 'Paused',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: true,
          internalType: 'address',
          name: 'bidder',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'RefundClaimed',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [],
      name: 'RefundMerkleRootSet',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [
        {
          indexed: false,
          internalType: 'address',
          name: 'account',
          type: 'address',
        },
        {
          indexed: false,
          internalType: 'bool',
          name: 'auctionOpened',
          type: 'bool',
        },
      ],
      name: 'Unpaused',
      type: 'event',
    },
    {
      anonymous: false,
      inputs: [],
      name: 'WinnerMerkleRootSet',
      type: 'event',
    },
    {
      inputs: [],
      name: 'MAXQUANTITY',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'MINQUANTITY',
      outputs: [
        {
          internalType: 'uint8',
          name: '',
          type: 'uint8',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: '_auctionName',
      outputs: [
        {
          internalType: 'string',
          name: '',
          type: 'string',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: '_auctionOpenTime',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: '_length',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: '_startingPriceInWeii',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'auctionEndThresholdHrs',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'auctionEnded',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'auctionStatus',
      outputs: [
        {
          components: [
            {
              internalType: 'bool',
              name: 'opened',
              type: 'bool',
            },
            {
              internalType: 'bool',
              name: 'closed',
              type: 'bool',
            },
          ],
          internalType: 'struct NFTAuction.AuctionStatus',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint8',
          name: 'quantity_',
          type: 'uint8',
        },
        {
          internalType: 'uint256[]',
          name: 'indexes_',
          type: 'uint256[]',
        },
        {
          internalType: 'bytes32[]',
          name: 'proof_',
          type: 'bytes32[]',
        },
      ],
      name: 'claimNFTs',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'amount_',
          type: 'uint256',
        },
        {
          internalType: 'bytes32[]',
          name: 'proof_',
          type: 'bytes32[]',
        },
      ],
      name: 'claimRefund',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'endAuction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'endWindows',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'bytes32',
          name: 'refundMerkleRoot_',
          type: 'bytes32',
        },
        {
          internalType: 'bytes32',
          name: 'winnerMerkleRoot_',
          type: 'bytes32',
        },
      ],
      name: 'finalizeAuction',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: 'bidder_',
          type: 'address',
        },
      ],
      name: 'getBid',
      outputs: [
        {
          components: [
            {
              internalType: 'uint256',
              name: 'unitPrice',
              type: 'uint256',
            },
            {
              internalType: 'uint256',
              name: 'quantity',
              type: 'uint256',
            },
          ],
          internalType: 'struct NFTAuction.Bid',
          name: '',
          type: 'tuple',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'lowestWinningBid',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'nftInstance',
      outputs: [
        {
          internalType: 'contract NFT',
          name: '',
          type: 'address',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'address',
          name: '',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
        {
          internalType: 'bytes',
          name: '',
          type: 'bytes',
        },
      ],
      name: 'onERC721Received',
      outputs: [
        {
          internalType: 'bytes4',
          name: '',
          type: 'bytes4',
        },
      ],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'openAuction',
      outputs: [],
      stateMutability: 'nonpayable',
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
      name: 'pause',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'paused',
      outputs: [
        {
          internalType: 'bool',
          name: '',
          type: 'bool',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'uint256',
          name: 'quantity_',
          type: 'uint256',
        },
        {
          internalType: 'uint256',
          name: 'unitPrice_',
          type: 'uint256',
        },
      ],
      name: 'placeBid',
      outputs: [],
      stateMutability: 'payable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'refundMerkleRoot',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
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
          name: 'nftInstance_',
          type: 'address',
        },
      ],
      name: 'setNftInstance',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'totalBids',
      outputs: [
        {
          internalType: 'uint256',
          name: '',
          type: 'uint256',
        },
      ],
      stateMutability: 'view',
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
    {
      inputs: [],
      name: 'unpause',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
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
      ],
      name: 'updateAuctionProps',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [],
      name: 'winnerMerkleRoot',
      outputs: [
        {
          internalType: 'bytes32',
          name: '',
          type: 'bytes32',
        },
      ],
      stateMutability: 'view',
      type: 'function',
    },
    {
      inputs: [],
      name: 'withdrawBalanceOwner',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      inputs: [
        {
          internalType: 'contract IERC20',
          name: 'token',
          type: 'address',
        },
        {
          internalType: 'uint256',
          name: 'amount',
          type: 'uint256',
        },
      ],
      name: 'withdrawERC20Token',
      outputs: [],
      stateMutability: 'nonpayable',
      type: 'function',
    },
    {
      stateMutability: 'payable',
      type: 'receive',
    },
  ],
};
