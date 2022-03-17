const mongoose = require('mongoose');
const {
  toJSON,
  paginate
} = require('./plugins');
const {
  CURRENCCY, BOX
} = require('./Model.JSON/Percentage.model');

const BoxSchema = mongoose.Schema(
  {
    tokenId: {
      type: Number,
    },
    type: {
      type: BOX,
      default: '',
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
    address: {
      type: String,
      default: '',
    },
  },
  {
    _id: true,
    timestamps: true,
  }
);

BoxSchema.plugin(toJSON);
BoxSchema.plugin(paginate);
const Box = mongoose.model('Box', BoxSchema);

module.exports = Box;
