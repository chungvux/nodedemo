const mongoose = require('mongoose');

const treeSchema = new mongoose.Schema(
  {
    ID: {
      type: Number,
      required: true,
      unique: [true, 'ID is taken.'],
    },
    Wallet: {
      type: Array,
      default: [],
    },
    Address: {
      type: String,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('tree', treeSchema);
