const {
  BigLand,
  SmallLand,
  Mineral,
  TreeContract,
  HistoryTransaction,
  Box,
  HeroNFT
} = require('../models');

const {
  BOX
} = require('../models/Percentage.model');
const {
  heroSocket,
  landSocket
} = require('../config/Contract');
const {
  TYPE_TRANSACTION,
  TYPE_ITEM
} = require('../constants/history');

const queryBigLands = async (filter, options) => {
  const lands = await BigLand.paginate(filter, options);
  return lands;
};

const queryAllSmallLands = async (parendId) => {
  const lands = await SmallLand.find({
    parentId: parendId
  });
  return lands;
};

const queryOneSmallLands = async (ID) => {
  const lands = await SmallLand.findOne({
    _id: ID
  });
  return lands;
};

const getAllMineral = async () => {
  const minerals = await Mineral.find({});
  return minerals;
};

const getOneMineral = async (id) => {
  const mineral = await Mineral.findOne({
    _id: id
  });
  return mineral;
};

const getNFTLand = async (tokenId) => {
  const data = await SmallLand.findOne({
    tokenId: tokenId
  });
  return data;
};


heroSocket.once('buyNewBox', {
  filter: {},
  fromBlock: 'lastest'
}, async (err, data) =>
{
  if (err) return;
  if (data) {
    const address = data.returnValues[0];
    const typeBox = data.returnValues[1];
    const tokenId = data.returnValues[2];
    const wallet = await TreeContract.findOne({
      Address: address
    });
    if (!wallet) { // check address invalid in system
      return false;
    }
    const box = await new Box({
      tokenId,
      type: BOX[typeBox],
      isOpen: false,
      address: address
    }).save();

    await new HeroNFT({
      tokenId,
      ownerAddress: address
    }).save();


    await new HistoryTransaction({
      address: address,
      transactionTime: new Date().getTime(),
      transaction: TYPE_TRANSACTION.buy,
      item: TYPE_ITEM.box,
      status: true
    }).save();

    console.log(`User [${address}] buy successfully`);
  }
});

landSocket.events.buyNewLand({
  filter: {},
  fromBlock: 'latest'
}, async (err, data) => {
  console.log("data : ", data);
  console.log("err : ", err);
  if (err) {
    return;
  }

  let parendId = data.returnValues[2].split('_')[0];
  let childId = data.returnValues[2].split('_')[1];

  if (parseInt(childId) < 1 || parseInt(childId) > 100) {
    console.log(`ID small land Invalid`);
  }
  const wallet = await TreeContract.findOne({
    Address: data.returnValues[0]
  });
  if (!wallet) { // check address invalid in system
    return console.log(`Address buy land don't exist in database`);
  }

  //check Small land
  const findSmallLand = await SmallLand.findOne({
    _id: data.returnValues[2]
  });
  if (findSmallLand) {
    return console.log(`${data.returnValues[2]} has been belong to another user`);
  }

  //check big land
  const findBigLand = await BigLand.findOne({
    _id: parendId
  });
  if (!findBigLand) {
    return console.log(`ID big land invalid`);
  }

  const newLand = new SmallLand({
    _id: data.returnValues[2],
    tokenId: data.returnValues[1],
    ownerAddress: data.returnValues[0],
    status: 1,
    parentId: parendId
  });
  await newLand.save();

  const newHistory = new HistoryTransaction({
    address: data.returnValues[0],
    transactionTime: new Date(),
    transaction: TYPE_TRANSACTION.buy,
    item: TYPE_ITEM.smallland,
    status: true
  });
  await newHistory.save();
});

// landSocket.events.buyLand({filter:{},fromBlock :'latest'},async(err,data)=>{
// })
module.exports = {
  queryBigLands,
  queryAllSmallLands,
  queryOneSmallLands,
  getAllMineral,
  getOneMineral,
  getNFTLand
};
