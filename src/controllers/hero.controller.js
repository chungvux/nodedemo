const httpStatus = require('http-status');

const {
  HeroNFT
} = require('../models')

const {
  COMMON_HERO,
  RARE_HERO,
  EPIC_HERO,
  LEGENDARY_HERO
} = require('../models/hero.model');

const listHeroes = async (req, res) => {
  const {
    type
  } = req.body;
  const convertObjectToArray=(obj)=>{
    let data=[]
    for (const key in obj) {
      data.push(obj[key])
    }
    return data
  }
  let heroes;
  if(type){
    switch (type.toLowerCase()) {
      case 'common':
        heroes = convertObjectToArray(COMMON_HERO);
        break;
      case 'rare':
        heroes = convertObjectToArray(RARE_HERO);
        break;
      case 'epic':
        heroes = convertObjectToArray(EPIC_HERO);
        break;
      case 'legend':
        heroes = convertObjectToArray(LEGENDARY_HERO);
        break;
    }
  }
  else{
    heroes=[
      ...convertObjectToArray(COMMON_HERO),
      ...convertObjectToArray(RARE_HERO),
      ...convertObjectToArray(EPIC_HERO),
      ...convertObjectToArray(LEGENDARY_HERO),
    ]
  }

  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: heroes
  })
}

const listHeroesUser = async (req, res) => {
  const address = req.wallet.Address;
  const heroes = await HeroNFT.find({
    ownerAddress: address
  })

  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: heroes
  })
}

const detailHero = async (req, res) => {
  const idHero = req.body.idHero;

  const hero = await HeroNFT.find({
    _id: idHero
  })

  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: hero
  })
}

const ownHero = async (req, res) => {
  const address = req.wallet.Address;
  const {
    name,
    type,
    rarity,
    skin,
    quantityLandIsMining,
    tokenId
  } = req.body;

  await new HeroNFT({
    rank: 1,
    minningSpeed: 50,
    level: 1,
    name,
    type,
    rarity,
    skin,
    tokenId,
    quantityLandIsMining,
    ownerAddress: address
  }).save()
}



module.exports = {
  listHeroes,
  listHeroesUser,
  detailHero,
  ownHero
}
