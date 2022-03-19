var axios = require('axios')
const Web3 = require('web3')
// const web3 = new Web3(process.env.BSC_RPC_MAINNET)
var web3
var web3_socket
var BSC_SOCKET_RPC
var api_binance
var getTx
// const web3 = new Web3(process.env.BSC_RPC_TESTNET)
const { BEP20 } = require('../config/BEP20')
const Web3WsProvider = require("web3-providers-ws")

const { Contract_HBG } = require('../config/Contract/contract')
const InputDataDecoder = require('ethereum-input-data-decoder');
const decoder = new InputDataDecoder(Contract_HBG.ABI);
var web3_socket

const TreeContractModel = require('../models/treeContract.model')
const TreeModel = require('../models/tree.model')
const { sleep } = require('./general')

var BSC_SOCKET_RPC

const setup = async () => {
    try {
        const options = {
            timeout: 30000, // ms

            // Useful for credentialed urls, e.g: ws://username:password@localhost:8546
            headers: {
                authorization: 'Basic username:password'
            },

            clientConfig: {
                // Useful if requests are large
                maxReceivedFrameSize: 100000000,   // bytes - default: 1MiB
                maxReceivedMessageSize: 100000000, // bytes - default: 8MiB

                // Useful to keep a connection alive
                keepalive: true,
                keepaliveInterval: 60000 // ms
            },

            // Enable auto reconnection
            reconnect: {
                auto: true,
                delay: 5000, // ms
                maxAttempts: 5,
                onTimeout: false
            }
        };
        if (process.env.TESTNET) {
            web3 = new Web3(new Web3.providers.HttpProvider("https://data-seed-prebsc-2-s2.binance.org:8545/"))
            BSC_SOCKET_RPC = "wss://speedy-nodes-nyc.moralis.io/e25073de844f8e3a6db7baec/bsc/testnet/ws"
            api_binance = "55Z9MXRSH898ACA6A86Q24K5SBCF8BNMM2"
            getTx = `https://api-testnet.bscscan.com/api?module=account&action=txlist&address=${Contract_HBG.Address}&startblock=0&endblock=99999999&sort=desc&page=1&offset=170&apikey=${api_binance}`
        } else {
            web3 = new Web3(new Web3.providers.HttpProvider("https://bsc-dataseed.binance.org/"))
            BSC_SOCKET_RPC = 'wss://speedy-nodes-nyc.moralis.io/03e87714a9d66c556ff43df0/bsc/mainnet/archive/ws'
            api_binance = "KXW7KSH8BMVJ28AG5EH4NDUGR4YW47FCDC"
            getTx = `https://api.bscscan.com/api?module=account&action=txlist&address=${Contract_HBG.Address}&startblock=0&endblock=99999999&sort=desc&page=1&offset=170&apikey=${api_binance}`
        }
        const ws = new Web3WsProvider(BSC_SOCKET_RPC, options)
        web3_socket = new Web3(ws)
        console.log("done")
    } catch (error) {
        console.log(error)
    }
}

const checkUpline = async ({ address }) => {
    const isAddress = await web3.utils.isAddress(address)
    if (!isAddress)
        return { status: true, message: `Address is not correct.` }
    try {
        const contract = new web3.eth.Contract(BEP20.abi, BEP20.address)
        const upline = await contract.methods.uplineWallet(address).call()
        return { status: true, upline: upline}
    } catch (error) {
        console.log(error)
        return { status: false, message: error.message }
    }
}

const getRootAddress = async () =>{
    const contract = new web3.eth.Contract(BEP20.abi, BEP20.address)
    const root_wallet = await contract.methods.rootUplineWallet().call()
    return root_wallet
}

const getToken = async (address) =>{
    const contract = new web3.eth.Contract(BEP20.abi, BEP20.address)
    var token = await contract.methods.balanceOf(address).call()
    console.log(token)
    return token / 10**BEP20.decimals
}

const cron = async () => {
    try {
        var respone = await axios.get(getTx)
        var data = respone.data.result
        // 0x5322152587d7c084d5dde80a7a2ea569327896f0
        // var data =await TreeContractModel.find().sort({ ID: -1 })
        for (var index = data.length - 1; index > 0; index--) {

            if (data[index].isError != '0')
                continue
            await sleep(500)
            var check_account_tree = await TreeModel.findOne({ Address: data[index].from.toLowerCase() })
            var input = await decoder.decodeData(data[index].input);
            if (!check_account_tree) {
                var sponsor = "0x" + input.inputs
                if (sponsor == "0x0000000000000000000000000000000000000000")
                    sponsor = "0xeccea453a9c3926da52860a8286f8c6e9e9cdeb6"
                var find_sponsor_tree = await TreeModel.findOne({ Address: sponsor })
                if (find_sponsor_tree)
                {
                    var ID
                    var lastest_data_tree = await TreeModel.find().sort({ ID: -1 }).limit(1)
                    lastest_data_tree.length > 0 ? ID = lastest_data_tree[0].ID + 1 : ID = 1
                    var wallet = find_sponsor_tree.Wallet
                    wallet.unshift(ID)
                    await new TreeModel({
                        ID: ID,
                        Wallet: wallet,
                        Address: data[index].from.toLowerCase()
                    }).save()
                }
            }

            var check_address = await TreeContractModel.findOne({ Address: data[index].from })
            if (!check_address) {
                var input = await decoder.decodeData(data[index].input);
                var check_account = await TreeContractModel.findOne({ Address: data[index].from.toLowerCase() })
                if (check_account)
                    continue
                var sponsor = "0x" + input.inputs
                if (sponsor == "0x0000000000000000000000000000000000000000")
                    sponsor = "0xeccea453a9c3926da52860a8286f8c6e9e9cdeb6"
                var find_sponsor = await TreeContractModel.findOne({ Address: sponsor })

                if (!find_sponsor)
                    continue
                var ID
                var lastest_data = await TreeContractModel.find().sort({ ID: -1 }).limit(1)
                lastest_data.length > 0 ? ID = lastest_data[0].ID + 1 : ID = 1
                var wallet = find_sponsor.Wallet
                wallet.unshift(ID)
                await new TreeContractModel({
                    ID: ID,
                    Wallet: wallet,
                    Address: data[index].from.toLowerCase()
                }).save()
                console.log("xong")

            }
        }
    } catch (error) {
        console.log(error)
    }
}

const main = async () => {
    try {
        console.log("vao")
        web3_socket.eth.subscribe('logs', {
            address: "0x8c2da84ea88151109478846cc7c6c06c481dbe97",
            topics: ["0xddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef"]
        }, function (error, result) {
            if (error)
                console.log("error ", error);
                else
                console.log(result)
        })
            .on("connected", function (subscriptionId) {
                console.log("SubscriptionId : ", subscriptionId)
            })
            .on("data", async function (log) {
                try {
                    console.log(log)
                    handleTx(log)
                } catch (error) {
                    console.log("subscriber ", error)
                }
            }).on("error", function (error) {
                if (error.code === 1006) {
                    console.log("Re-subscribing....")
                    return main()
                } else {
                    console.log(error.message)
                    web3_socket.eth.clearSubscriptions()
                }
            })
    } catch (error) {

    }

}

const handleTx = async (log) => {
    try {
        console.log("handleTx")
        await sleep(30000)
        const {transactionHash} = log
        const transaction = transactionHash
        var result_status = await web3.eth.getTransactionReceipt(transaction)
        if (!result_status.status)
        return
        var result = await web3.eth.getTransaction(transaction)
        var input = await decoder.decodeData(result.input);
        if (input.method != 'register' || result.to.toLowerCase() != Contract_HBG.Address)
            return
        var check_account = await TreeContractModel.findOne({ Address: result.from.toLowerCase() })
        if (check_account)
            return
        var sponsor = "0x" + input.inputs
        if (sponsor == "0x0000000000000000000000000000000000000000")
            sponsor = "0xeccea453a9c3926da52860a8286f8c6e9e9cdeb6"
        var find_sponsor = await TreeContractModel.findOne({ Address: sponsor })
        if (!find_sponsor)
            return res.status(200).json({ status: false, message: `Sponsor not found.` })

        var ID
        var lastest_data = await TreeContractModel.find().sort({ ID: -1 }).limit(1)
        lastest_data.length > 0 ? ID = lastest_data[0].ID + 1 : ID = 1

        var wallet = find_sponsor.Wallet
        wallet.unshift(ID)
        await new TreeContractModel({
            ID: ID,
            Wallet: wallet,
            Address: result.from.toLowerCase()
        }).save()
    } catch (error) {
        console.log(error)
    }
}

const setuprun = async ()=>{
   await setup()
    // main()
    // cron()

}
setuprun()
var cronInterval = setInterval(cron, 600000);

module.exports = { web3, checkUpline, getRootAddress, getToken, decoder}
