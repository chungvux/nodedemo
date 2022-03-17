const { SmallLand, HeroNFT } = require('../models');
const { MONTH, DAY } = require('../constants/time')

const getMyLand = async (filter,option) => {
  const lands = await SmallLand.paginate(filter,option);
  return lands;
};

const getMyHero = async (address) => {
  const heros = await HeroNFT.find({ ownerAddress: address });
  return heros;
};

const getOneMyLand = async (address,idSmallLand) => {
  let land = await SmallLand.findOne({ ownerAddress: address , _id:idSmallLand});
  if(land && land.miningHero){
    const hero = await HeroNFT.findOne({tokenId:land.miningHero})
    if(hero){
      let currentTime=new Date().getTime()
      let point = (currentTime-land.startTimeMining.getTime())/MONTH*hero.miningSpeed
      land.restPoint-=point
      if(land.restPoint<=0){
        land.isDone=true
        land.startTimeMining=null
        land.miningHero=null
        hero.quantityLandIsMining-=1
        await hero.save()
        await land.save()
        return land
      }
      land.startTimeMining=currentTime
      await land.save()
      land = land.toObject()
      land.remainingTime=land.restPoint/hero.miningSpeed*MONTH/DAY
    }
  }
  return land;
};

const getOneMyHero = async (address,idHero) => {
  const hero = await HeroNFT.findOne({ ownerAddress: address , tokenId:idHero});
  return hero;
};

const countMyHero = async (address) => {
  const quantity = await HeroNFT.count({ ownerAddress: address });
  return quantity;
};

const countMyLand = async (address) => {
  const quantity = await SmallLand.count({ ownerAddress: address });
  return quantity;
};

module.exports = {
  getMyLand,
  getMyHero,
  countMyHero,
  countMyLand,
  getOneMyHero,
  getOneMyLand
};
