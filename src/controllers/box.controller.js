/* eslint-disable prettier/prettier */
const httpStatus = require('http-status');
// const ApiError = require('../utils/ApiError');
// const catchAsync = require('../utils/catchAsync');
const {
  Box,
  HeroNFT
} = require('../models');
const {
  BOX,
  SKIN_RARITY,
  RATION_SKIN_BOX
} = require('../models/Percentage.model');

const {
  COMMON_HERO,
  RARE_HERO,
  EPIC_HERO,
  LEGENDARY_HERO,
} = require('../models/hero.model');

const {
  boxService,
  userService
} = require('../services');
// const pick = require('../utils/pick');\

/**
 *
 * @param {String} address Address of Logging In User
 * @returns {Boxes}
 */

const getAllBoxes = async (req, res) => {
  const allBoxes = await boxService.getAllBoxes();

  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: allBoxes
  });
};

/**
 * Get user by id
 * @param {string} address
 * @returns {Promise<Box>}
 */
const getUserBoxes = async (req, res) => {
  const address = req.wallet.Address;
  const allBoxes = await boxService.getBoxOfUser(address);

  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: allBoxes
  });
};

/**
 * Open the box having
 * @param {ObjectId} idBox
 * @returns {Promise<Box>}
 */

const openBox = async (req, res) => {
  const tokenId = parseInt(req.params.tokenId);
  const address = req.wallet.Address;

  const box = await boxService.getBox(tokenId, address);


  if (box && box.isOpen === false) {
    const data = await generateBoxForUser(box, address);
    const hero = await HeroNFT.findOne({
      tokenId,
      ownerAddress: address
    });
    if (hero) {
      hero.name = data.hero.name;
      hero.type = data.hero.type;
      hero.description = data.hero.description;
      hero.ratity = data.typeBox[1];
      hero.skin = data.typeBox[0];
    } else {
      hero.tokenId = tokenId;
      hero.ownerAddress = address;
      hero.name = data.hero.name;
      hero.type = data.hero.type;
      hero.description = data.hero.description;
      hero.ratity = data.typeBox[1];
      hero.skin = data.typeBox[0];
    }
    box.isOpen = true;
    const birthHero = await hero.save();
    const updateBox = await box.save();
    res.status(200).json({
      status: true,
      code: httpStatus[200],
      message: '',
      data: {
        updateBox,
        birthHero
      }
    });
  } else {
    res.status(400).json({
      status: false,
      code: httpStatus[400],
      message: 'Fail to open box !!!',
      data: box
    });
  }
};

const shopBoxes = (req, res) => {
  const {
    box
  } = req.body;

  const SCRIPT_OPEN_BOX = genRatioBox(RATION_SKIN_BOX[box]);

  res.status(200).json({
    status: true,
    code: httpStatus[200],
    message: '',
    data: {
      SCRIPT_OPEN_BOX
    }
  });
}

const generateBoxForUser = async (boxEntity, address) => {
  const user = await userService.getUserByAddress(address);

  if (!user) return {
    status: false,
    code: httpStatus[400],
    message: `Couldn't find [${address}] user`
  };

  const box = boxEntity.type.Type;

  const typeBox = randomBox(box);

  let typeHero;

  switch (typeBox[1].toLowerCase()) {
    case 'common':
      typeHero = COMMON_HERO;
      break;
    case 'rare':
      typeHero = RARE_HERO;
      break;
    case 'epic':
      typeHero = EPIC_HERO;
      break;
    case 'legend':
      typeHero = LEGENDARY_HERO;
      break;
  }
  const heroes = Object.values(typeHero);
  const indexHero = randomHero(heroes.length);
  const hero = heroes[indexHero];
  return {
    hero,
    typeBox
  }
};

const genRatioBox = (rationSkinBox) => {
  return {
    Origin_Common: (SKIN_RARITY.Origin * rationSkinBox.Common).toFixed(4),
    Origin_Rare: (SKIN_RARITY.Origin * rationSkinBox.Rare).toFixed(4),
    Origin_Epic: (SKIN_RARITY.Origin * rationSkinBox.Epic).toFixed(4),
    Origin_Legend: (SKIN_RARITY.Origin * rationSkinBox.Legend).toFixed(4),
    Chromas_Common: (SKIN_RARITY.Chromas * rationSkinBox.Common).toFixed(4),
    Chromas_Rare: (SKIN_RARITY.Chromas * rationSkinBox.Rare).toFixed(4),
    Chromas_Epic: (SKIN_RARITY.Chromas * rationSkinBox.Epic).toFixed(4),
    Chromas_Legend: (SKIN_RARITY.Chromas * rationSkinBox.Legend).toFixed(4),
    Prestige_Common: (SKIN_RARITY.Prestige * rationSkinBox.Common).toFixed(4),
    Prestige_Rare: (SKIN_RARITY.Prestige * rationSkinBox.Rare).toFixed(4),
    Prestige_Epic: (SKIN_RARITY.Prestige * rationSkinBox.Epic).toFixed(4),
    Prestige_Legend: (SKIN_RARITY.Prestige * rationSkinBox.Legend).toFixed(4)
  };
};

const randomBox = (box) => {
  const ratio = parseFloat((Math.random()).toFixed(4));

  const SCRIPT_OPEN_BOX = genRatioBox(RATION_SKIN_BOX[box]);

  let datas = Object.entries(SCRIPT_OPEN_BOX).filter((value) => parseFloat(value[1]) !== 0);

  datas = (upArr(datas, datas.length)).reverse();
  let ratioBox = 0;
  let val;
  for (let i = 0; i < datas.length; i++) {

    ratioBox = ratioBox + parseFloat(datas[i][1]);
    let temp = parseFloat(ratioBox.toFixed(4));
    val = datas[i];
    if (temp >= ratio) break;
  }
  return val[0].split('_');
};

const randomHero = (max) => {
  return Math.floor(Math.random() * (max - 0)) + 0;
};


const upArr = (arr, l) => {
  let temp;
  for (let i = 0; i < l - 1; i++) {
    for (let j = i + 1; j < l; j++) {
      if (parseFloat(arr[i][1]) > parseFloat(arr[j][1])) {
        temp = arr[i];
        arr[i] = arr[j];
        arr[j] = temp;
      }
    }
  }

  return arr;
}

module.exports = {
  getAllBoxes,
  openBox,
  getUserBoxes,
  shopBoxes
};
