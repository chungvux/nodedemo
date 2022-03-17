const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
//const ApiError = require('../utils/ApiError');
const { SmallLand, HeroNFT } = require('../models')

const checkBothHeroAndLand = async (req, res, next) => {
    const land = await SmallLand.findOne({_id:req.body.idSmallLand})
    if(!land){
        return res.status(httpStatus.BAD_REQUEST).json({status:false,message:'ID Land invalid'})
    }
    if(land.ownerAddress!==req.wallet.Address){
        return res.status(httpStatus.FORBIDDEN).json({status:false,message:'Land not belong to you'})
    }
    if(req.body.idHero){
        const hero = await HeroNFT.findOne({tokenId:req.body.idHero})
        if(!hero){
            return res.status(httpStatus.BAD_REQUEST).json({status:false,message:'ID Hero invalid'})
        }
        if(hero.ownerAddress!==req.wallet.Address){
            return res.status(httpStatus.FORBIDDEN).json({status:false,message:'Hero not belong to you'})
        }
        req.hero=hero
    }
    
    req.land=land
    next()
};


module.exports = checkBothHeroAndLand

