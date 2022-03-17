const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const BigLandSchema = mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    status: {
      type: Number,
      enum: [-1, 0, 1], // -1: chưa mở bán, 0: đang mở bán , 1: đã bán
      default: 0,
    },
    name: {
      type: String,
      default: '',
    },
    latitude: {
      type: Number,
      defaut: 0,
    },
    longitude: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    ownerAddress: {
      type: String,
      default: null,
    }, // wallet address of owner NFT
    quantitySmallLandSold:{
      type:Number,
      default:0
    },
    rank:{
      type:Number,
      private:true
    }
  },
  {
    _id: false,
    timestamps: true,
  }
);
// add plugin that converts mongoose to json
BigLandSchema.plugin(toJSON);
BigLandSchema.plugin(paginate);

const BigLand = mongoose.model('BigLand', BigLandSchema);

module.exports = BigLand;
