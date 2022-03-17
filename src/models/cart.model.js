const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const cartSchema = mongoose.Schema(
  {
    address: {
      type: String,
      required: true,
    },
    landList: [
      {
        type: String, // small land
      },
    ],
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
cartSchema.plugin(toJSON);
cartSchema.plugin(paginate);

const cart = mongoose.model('cart', cartSchema);

module.exports = cart;
