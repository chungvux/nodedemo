const {
  Box
} = require('../models');
const {
  BOX
} = require('../models/Percentage.model');

const getAllBoxes = async () => {

  const convertObjectToArray=(obj)=>{
    let data=[]
    for (const key in obj) {
      data.push(obj[key])
    }
    return data
  }

  return convertObjectToArray(BOX)
};

/**
 * Get user by id
 * @param {string} address
 * @returns {Promise<Box>}
 */
const getBoxOfUser = async (address) => {
  const boxes = await Box.find({
    address,
  });
  return boxes;
};

/**
 * Find and get detail of this box
 * @param {ObjectId} idBox
 * @returns {Promise<Box>}
 */
const getDetailBox = async (idBox) => {
  const box = await Box.findOne({
    _id: idBox,
  });

  if (box) {
    return box;
  }
  return null;
};

const getBox = async (tokenId, address) => {
  const box = await Box.findOne({
    tokenId,
    address: address
  });

  if (box) {
    return box;
  }
  return null;
};

module.exports = {
  getDetailBox,
  getBoxOfUser,
  getAllBoxes,
  getBox
};
