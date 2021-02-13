module.exports = [
  {
    "inputs": [
      {
        "internalType": "contract IJuicer",
        "name": "_juicer",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "contract IERC20",
        "name": "token",
        "type": "address"
      }
    ],
    "name": "CleanTrackedWantToken",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_owner",
        "type": "address"
      },
      {
        "internalType": "contract IERC20",
        "name": "_token",
        "type": "address"
      }
    ],
    "name": "cleanTrackedWantedTokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "juicer",
    "outputs": [
      {
        "internalType": "contract IJuicer",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];