const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const smallLandSchema = mongoose.Schema(
  {
    _id: {
      type: String,
    },
    status: {
      type: Number,
      enum: [-1, 0, 1], // -1: chưa mở bán, 0: đang mở bán , 1: đã bán
      default: 1,
    },
    name: {
      type: String,
      default: '',
    },
    latitude: {
      type: Number,
      defaut: 125,
    },
    longitude: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    tokenId: {
      type: Number,
      default: 0,
    }, // id of nft
    ownerAddress: {
      type: String,
      default: null,
    }, // wallet address of owner NFT
    parentId: {
      type: Number,
      required: true,
    },
    restPoint:{
      type:Number,
      default: 100
    },
    miningHero:{
      type:Number,
      default:null
    },
    startTimeMining:{
      type:Date,
      default:null
    },
    isDone:{
      type:Boolean,
      default:false
    },
    isRecievedPoint:{
      type:Boolean,
      default:false
    }
  },
  {
    _id: false,
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
smallLandSchema.plugin(toJSON);
smallLandSchema.plugin(paginate);

const SmallLand = mongoose.model('SmallLand', smallLandSchema);

module.exports = SmallLand;
