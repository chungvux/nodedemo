const moment = require('moment')
const { HeroNFT, BigLand, TreeContract} = require('../models')
const { MONTH } = require('../constants/time')
const { BONUS, COMMISSION_RATIO } = require('../constants/mining')

const payCommission = async(array,point)=>{
  let newArray=[...array]
  newArray.shift()
  newArray=newArray.slice(0,5)
  const wallet = await TreeContract.find({ID:newArray})
  console.log(wallet)
  wallet.forEach(async(item,index)=>{
    if(!item.Point){
      item.Point=0
    }
    item.Point+=COMMISSION_RATIO[index]*point
    await item.save()
  })
  console.log(wallet)
}

const start = async (req) => {
  if(req.land.isDone){
    return {
      status :false,
      message:`Land ${req.land._id} have been exhausted`
    }
  }
  if(req.land.miningHero){
    const findHero= await HeroNFT.findOne({tokenId:req.land.miningHero})
    return {
      status :false,
      message:`Land ${req.land._id} has been mining by ${findHero.name} has Token ID is ${req.land.miningHero}`
    }
  }
  try{
    if(req.hero.quantityLandIsMining>=10){
      return {
        status :false,
        message:`Hero ${req.hero.name} can't mine over 10 Land`
      }
    }
    req.land.startTimeMining=new Date().getTime()
    req.land.miningHero=req.hero.tokenId
    req.hero.quantityLandIsMining+=1
    await req.land.save()
    await req.hero.save()
    return {
      status :true,
      message:`Hero ${req.hero.name} start mining Land ${req.land._id} at ${moment(new Date()).format("MMM Do YY")}`
    }
  }
  catch(err){
    console.log(err)
    return {
      status:false,
      message:'Error! An error occurred. Please try again later '
    }
  }
};

const end = async (req) => {
  if(req.land.isDone){
    return {
      status :false,
      message:`Land ${req.land._id} have been exhausted`
    }
  }
  if(!req.land.miningHero){
    return {
      status :false,
      message:`Land ${req.land._id} don't have Hero mining`
    }
  }
  const hero=await HeroNFT.findOne({tokenId:req.land.miningHero})
  if(!hero){
    return {
      status :false,
      message:`Don't find Hero`
    }
  }
  hero.quantityLandIsMining-=1
  await hero.save()
  let point = (new Date().getTime()-req.land.startTimeMining.getTime())/MONTH*hero.miningSpeed
  req.land.miningHero=null
  req.land.startTimeMining=null
  req.land.restPoint-=point
  await req.land.save()
  return {
    status:true,
    point:point,
    message:'Successfull'
  }
};

const claim = async (req) => {
  if(req.land.isRecievedPoint){
    return {
      status:false,
      message:`You had recieved Point before`
    }
  }
  if(!req.land.isDone){
    return {
      status:false,
      message:`This land has not been done!`
    }
  }
  const bigLand= await BigLand.findOne({_id:req.land.parentId})
  
  let index=bigLand.rank-1
  let bonusPoint=20+20*Math.floor(Math.random()*(BONUS[index].to-BONUS[index].from)+BONUS[index].from).toFixed(3)/100
  if(!req.wallet.Point){
    req.wallet.Point=0
  }
  
  req.wallet.Point+=bonusPoint
  req.land.isRecievedPoint=true
  payCommission(req.wallet.Wallet,bonusPoint)
  await req.land.save()
  await req.wallet.save()
  return {
    status:true,
    message:'You recieved 5 HBG',
    point:20,
    bonus:bonusPoint-20,
    total:bonusPoint
  }
};

const changeHero = async (req) => {
  if(!req.land.miningHero){
    return {
      status :false,
      message:`Land ${req.land._id} don't has hero mining before`
    }
  }
  if(req.land.isDone){
    return {
      status :false,
      message:`Land ${req.land._id} have been exhausted`
    }
  }
  if(req.hero.quantityLandIsMining>=10){
    return {
      status :false,
      message:`Hero ${req.hero.name} can't mine over 10 Land`
    }
  }
  let currentTime=new Date().getTime()
  const findHero = await HeroNFT.findOne({tokenId:req.land.miningHero})
  if(findHero.tokenId===req.hero.tokenId){
    return {
      status :false,
      message:`Land ${req.land._id} have been mining by Hero ${req.hero.name}`
    }
  }
  let point = (currentTime-req.land.startTimeMining.getTime())/MONTH*findHero.miningSpeed
  req.land.restPoint-=point
  req.land.startTimeMining=currentTime
  req.land.miningHero=req.hero.tokenId
  req.hero.quantityLandIsMining+=1
  findHero.quantityLandIsMining-=1
  await findHero.save()
  await req.land.save()
  await req.hero.save()
  return {
    status:true,
    message:'Change hero sucessfull !'
  }
};


module.exports = {
  start,
  end,
  claim,
  changeHero
};
