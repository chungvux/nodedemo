var Address

const testnet = async () => {
    Address = "0x234f80f2a1b04b88489346d9e346681305bb053b"

    if (process.env.TESTNET)
        Address = "0xcca0bdadb0f35164c27efc6fb992b66399b95bec"

}
testnet()

var Contract_HBG = {
    ABI: [
        { inputs: [], stateMutability: 'nonpayable', type: 'constructor' },
        {
            anonymous: false,
            inputs: [
                {
                    indexed: true, internalType: 'address', name: 'previousOwner', type: 'address',
                },
                {
                    indexed: true, internalType: 'address', name: 'newOwner', type: 'address',
                },
            ],
            name: 'OwnershipTransferred',
            type: 'event',
        },
        {
            inputs: [],
            name: 'BNB',
            outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'Token',
            outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'USDT',
            outputs: [{ internalType: 'contract IERC20', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'bonus_index',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'bonus_token',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'bonus_total',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_index', type: 'uint256' }],
            name: 'changeBonusIndex',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_token', type: 'uint256' }],
            name: 'changeBonusToken',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_total', type: 'uint256' }],
            name: 'changeBonusTotal',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_fee', type: 'uint256' }],
            name: 'changeRegisterFee',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address payable', name: '_addr', type: 'address' }],
            name: 'changeSender',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: '_fee', type: 'uint256' }],
            name: 'changeUplineFee',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'uint256', name: 'amount', type: 'uint256' }],
            name: 'getBNBPrice',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'owner',
            outputs: [{ internalType: 'address', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: '_upline', type: 'address' }],
            name: 'register',
            outputs: [],
            stateMutability: 'payable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'register_fee',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
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
            inputs: [],
            name: 'sender',
            outputs: [{ internalType: 'address payable', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [{ internalType: 'address', name: 'newOwner', type: 'address' }],
            name: 'transferOwnership',
            outputs: [],
            stateMutability: 'nonpayable',
            type: 'function',
        },
        {
            inputs: [],
            name: 'upline_fee',
            outputs: [{ internalType: 'uint256', name: '', type: 'uint256' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [],
            name: 'usdt_bnb', outputs: [{ internalType: 'address', name: '', type: 'address' }],
            stateMutability: 'view',
            type: 'function',
        },
        {
            inputs: [], name: 'withdrawBNB', outputs: [], stateMutability: 'nonpayable', type: 'function',
        },
    ],
    Address: Address,
}



module.exports = {Contract_HBG}