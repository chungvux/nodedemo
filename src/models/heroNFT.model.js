const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const {
  RATITY,
  SKIN
} = require('./hero.model');

const HeroNFTSchema = mongoose.Schema(
  {
    name: {
      type: String,
    },
    type: {
      type: String,
    },
    ratity: {
      type: String,
      enum: RATITY,
    },
    tokenId: {
      type: Number,
      required: true,
      unique: true,
      index:true
    },
    rank: {
      type: Number,
      default: 1,
    },
    skin: {
      type: String,
      enum: SKIN,
    },
    miningSpeed: {
      type: Number,
      default: 50,
    },
    ownerAddress: {
      type: String,
      required: true,
    },
    level: {
      type: Number,
      default: 1,
    },
    quantityLandIsMining: {
      type: Number,
      default: 0,
    },
  },
  {
    timestamps: true,
  }
);

HeroNFTSchema.plugin(toJSON);
HeroNFTSchema.plugin(paginate);

module.exports = mongoose.model('Hero', HeroNFTSchema);
