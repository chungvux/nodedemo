let Address = "0xc31";
if (process.env.TESTNET)
  Address = '0x529108EfeBf48c8598071F8bE8664d6f3BE26987';

const HERO_NFT = {
  ABI: [{
    "inputs": [{
      "internalType": "address",
      "name": "_owner",
      "type": "address"
    }, {
      "internalType": "contract IBEP20",
      "name": "_HBG",
      "type": "address"
    }],
    "stateMutability": "nonpayable",
    "type": "constructor"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "approved",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }],
    "name": "Approval",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "operator",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "bool",
      "name": "approved",
      "type": "bool"
    }],
    "name": "ApprovalForAll",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": true,
      "internalType": "address",
      "name": "from",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, {
      "indexed": true,
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }],
    "name": "Transfer",
    "type": "event"
  }, {
    "anonymous": false,
    "inputs": [{
      "indexed": false,
      "internalType": "address",
      "name": "user",
      "type": "address"
    }, {
      "indexed": false,
      "internalType": "string",
      "name": "boxType",
      "type": "string"
    }, {
      "indexed": false,
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }],
    "name": "buyNewBox",
    "type": "event"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "token_No",
      "type": "uint256"
    }],
    "name": "BurnNFT",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_owner",
      "type": "address"
    }],
    "name": "ChangeOwner",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "HBG",
    "outputs": [{
      "internalType": "contract IBEP20",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_user",
      "type": "address"
    }],
    "name": "Mint",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "_silver",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_gold",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_platinum",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_diamond",
      "type": "uint256"
    }],
    "name": "SetPrice",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address[]",
      "name": "addresses",
      "type": "address[]"
    }],
    "name": "addAddressToWhiteList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }],
    "name": "approve",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }],
    "name": "balanceOf",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "baseURI",
    "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_user",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "_type",
      "type": "uint256"
    }, {
      "internalType": "uint256",
      "name": "_payment",
      "type": "uint256"
    }],
    "name": "buyBox",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "_newToken",
      "type": "address"
    }],
    "name": "changeToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "checker",
    "outputs": [{
      "internalType": "address[]",
      "name": "",
      "type": "address[]"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "circulatingSupply",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "cleanWhiteList",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "diamondBox",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "diamondPrice",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "endClaimHero",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }],
    "name": "getApproved",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "goldPrice",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "goldenBox",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "owner",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "operator",
      "type": "address"
    }],
    "name": "isApprovedForAll",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "name",
    "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "owner",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }],
    "name": "ownerOf",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "name": "ownerOfDiamondBox",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "name": "ownerOfGoldenBox",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "name": "ownerOfPlatinumBox",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "name": "ownerOfSilverBox",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "platinumBox",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "platinumPrice",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "from",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "from",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }, {
      "internalType": "bytes",
      "name": "_data",
      "type": "bytes"
    }],
    "name": "safeTransferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "operator",
      "type": "address"
    }, {
      "internalType": "bool",
      "name": "approved",
      "type": "bool"
    }],
    "name": "setApprovalForAll",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "string",
      "name": "__baseURI",
      "type": "string"
    }],
    "name": "setBaseURI",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [],
    "name": "silverBox",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "silverPrice",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "name": "start",
    "outputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "bytes4",
      "name": "interfaceId",
      "type": "bytes4"
    }],
    "name": "supportsInterface",
    "outputs": [{
      "internalType": "bool",
      "name": "",
      "type": "bool"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [],
    "name": "symbol",
    "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }],
    "name": "tokenURI",
    "outputs": [{
      "internalType": "string",
      "name": "",
      "type": "string"
    }],
    "stateMutability": "view",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "address",
      "name": "from",
      "type": "address"
    }, {
      "internalType": "address",
      "name": "to",
      "type": "address"
    }, {
      "internalType": "uint256",
      "name": "tokenId",
      "type": "uint256"
    }],
    "name": "transferFrom",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }, {
    "inputs": [{
      "internalType": "uint256",
      "name": "",
      "type": "uint256"
    }],
    "name": "whitelistedPeople",
    "outputs": [{
      "internalType": "address",
      "name": "",
      "type": "address"
    }],
    "stateMutability": "view",
    "type": "function"
  }],
  Address: Address, //"0x41E5d889123DBbFD516cE67C1758c11AD1923968"
};
module.exports = HERO_NFT
