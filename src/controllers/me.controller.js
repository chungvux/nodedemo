const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
const { meService } = require('../services');

const getMyLand = catchAsync(async (req, res) => {
  let filters={
    ownerAddress:req.wallet.Address
  }
  let options={}
  options.limit = req.query.limit ? req.query.limit : 25;
  options.page = req.query.page ? req.query.page : 1;
  const lands = await meService.getMyLand(filters,options);
  res.status(httpStatus.OK).json({ status: true, data:lands });
});

const getOneMyHero = catchAsync(async (req, res) => {
  const hero = await meService.getOneMyHero(req.wallet.Address,req.params.idHero);
  res.status(httpStatus.OK).json({ 
    status: hero?true:false, 
    data: hero,
    message:hero?'Successfull':'Hero not belong to you' 
  });
});

const getOneMyLand = catchAsync(async (req, res) => {
  const land = await meService.getOneMyLand(req.wallet.Address,req.params.idLand);
  res.status(httpStatus.OK).json({ 
    status: land?true:false, 
    data: land,
    message:land?'Successfull':'Land not belong to you' 
  });
});

const getMyHero = catchAsync(async (req, res) => {
  const hero = await meService.getMyHero(req.wallet.Address);
  res.status(httpStatus.OK).json({ status: true, data: hero });
});

const countMyHero = catchAsync(async (req, res) => {
  // const newHero= new HeroNFT({
  //     name:'Geoffrey',
  //     type:'Sniper',
  //     ratity:'Rare',
  //     skin:'Chromas',
  //     tokenId:3,
  //     miningSpeed:75,
  //     rank:3,
  //     ownerAddress:'0xeccea453a9c3926da52860a8286f8c6e9e9cdeb6'
  // })
  // await newHero.save()
  const quantity = await meService.countMyHero(req.wallet.Address);
  res.status(httpStatus.OK).json({ status: true, quantity });
});

const countMyLand = catchAsync(async (req, res) => {
  const quantity = await meService.countMyLand(req.wallet.Address);
  res.status(httpStatus.OK).json({ status: true, quantity });
});

module.exports = {
  getMyLand,
  getMyHero,
  countMyHero,
  countMyLand,
  getOneMyHero,
  getOneMyLand,
};
