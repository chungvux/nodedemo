const { BigLand, SmallLand, HeroNFT } = require('../models')
const httpStatus = require('http-status');
const jwt = require('jsonwebtoken');
//const ApiError = require('../utils/ApiError');

const checkIdSmallLand=async(req,res,next)=>{
    let parendId=parseInt(req.params.idSmallLand.split('_')[0])||0
    let childrenId= parseInt(req.params.idSmallLand.split('_')[1])||0
    const bigLand=await BigLand.findOne({_id:parendId})
    if(!bigLand||childrenId<1||childrenId>100){
        return res.status(httpStatus.BAD_REQUEST).json({
            status:false,
            message:'ID land invalid'
        })
    }
    next()
}

const checkOwnerLand = async(req,res,next)=>{
    const smallLand = await SmallLand.findOne({ _id: req.params.idSmallLand });
    if (smallLand&&smallLand.ownerAddress) {
        return res.status(httpStatus.BAD_REQUEST).json({
            status:false,
            message:'Land has been belong to another user'
        })
    }
    next()
} 


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

module.exports={
    checkIdSmallLand,
    checkBothHeroAndLand,
    checkOwnerLand
}