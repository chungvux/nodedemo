/* eslint-disable no-unused-vars */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-plusplus */
const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { BigLand, SmallLand, Mineral, LandId } = require('../models');
const { landService } = require('../services');
const { heroContract, tokenHBGContract, heroSocket, tokenHBGSocket, landContract, landSocket } = require('../config/Contract')
const { randomRatio } = require('../random/land')
const { RANK_LAND_RATIO } = require('../constants/mining')

// const testApi = async () => {
//   const data=await LandId.findOne({_id:'62300253fa40733d686bb8db'})
//   for(let i=0;i<data.array.length;i++){
//     let newBigLand = await BigLand({
//       latitude: Math.random().toFixed(5)*1000,
//       longitude:Math.random().toFixed(5)*1000,
//       _id:data.array[i],
//       rank: randomRatio(RANK_LAND_RATIO)+1
//     }).save();
//   }
  // for (let i = 0; i < 55600; i++) {
  //   let newBigLand = await BigLand({
  //     latitude: Math.random().toFixed(5)*1000,
  //     longitude:Math.random().toFixed(5)*1000,
  //     _id:
  //     rank: randomRatio(RANK_LAND_RATIO)+1
  //   }).save();
    // for (let j = 1; j <= 100; j++) {
    //   await SmallLand({
    //     parentId: newBigLand._id,
    //     _id: newBigLand._id + '_' + j,
    //     latitude: 0.111,
    //   }).save();
    // }
// }
  // for (let i = 1; i <= 8; i++) {
  //   await Mineral({
  //     _id: i,
  //   }).save();
  // }
//testApi();
// chạy hàm này 1 lần để tạo 10k miếng đất trong database
// const generateMineral = async () => {
//   for (let i = 1; i <= 24; i++) {
//     await Mineral({
//       _id: i,
//       latitude:Math.random()*1000,
//       longitude:Math.random()*1000,
//     }).save();
//   }
// };
// generateMineral()
// //chạy 1 lần để tạo 24 mineral
const checkMineral=async()=>{
  let count=0
  const minerals=await Mineral.find({})
  const landData=await LandId.findOne({_id:'62300253fa40733d686bb8db'})
  for(let i=0;i<minerals.length;i++){
    for(let j=0;j<minerals[i].position.length;j++){
      if(!landData.array.includes(minerals[i].position[j])){
        count++
      }
    }
  }
  return count


}
//checkMineral().then((data)=>console.log(data))

const getCustomBigLand = catchAsync(async (req, res) => {
  const filter = {
    status: [0, 1],
  };
  const options = {
    limit: 100,
    page: 1,
  };
  if (Number.isInteger(req.query.status)) {
    filter.status = [req.query.status];
  }
  options.limit = req.query.limit ? req.query.limit : 100;
  options.page = req.query.page ? req.query.page : 1;

  const lands = await landService.queryBigLands(filter, options);
  res.status(httpStatus.OK).send({ status:true, data: lands });
});

const getCustomSmallLand = catchAsync(async (req, res) => {
  const lands = await landService.queryAllSmallLands(req.body.idBigLand);
  if (lands.length === 0) {
    res.status(httpStatus.OK).send({ status: false });
  }
  res.status(httpStatus.OK).send({ status: true, data: lands });
});

const getOneSmallLand = catchAsync(async (req, res) => {
  const lands = await landService.queryOneSmallLands(req.params.idSmallLand);
  if (lands.length === 0) {
    res.status(httpStatus.OK).send({ status: false });
  }
  res.status(httpStatus.OK).send({ status: true, data: lands });
});

const getAllMineral = catchAsync(async (req, res) => {
  const minerals = await landService.getAllMineral();
  if (minerals.length === 0) {
    res.status(httpStatus.OK).send({ status: false });
  }
  res.status(httpStatus.OK).send({ status: true, data: minerals });
});

const getOneMineral = catchAsync(async (req, res) => {
  const mineral = await landService.getOneMineral(req.params.idMineral);
  if (!mineral) {
    return res.status(httpStatus.OK).send({ status: false, message: 'ID mineral invalid' });
  }
  res.status(httpStatus.OK).send({ status: true, data: mineral });
});

const getNFTLand=catchAsync(async (req, res) => {
  const land=await landService.getNFTLand(req.params.tokenId)
  if(!land){
    return res.status(httpStatus.OK).send({status:false,message:'Land is not existed'})
  }
  res.status(httpStatus.OK).send(land)
});

module.exports = {
  getCustomBigLand,
  getCustomSmallLand,
  getOneSmallLand,
  getAllMineral,
  getOneMineral,
  getNFTLand
};
