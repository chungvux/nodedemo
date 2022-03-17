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
      default: null,
    },
    Email: {
      type: String,
      default: null,
    },
    Password: {
      type: String,
      default: null,
    },
    Jwt_Token: {
      type: String,
      default: null,
    },
    Blocked: {
      type: Boolean,
      default: false,
    },
    Username: {
      type: String,
      default: null,
    },
    Battle: {
      type: Boolean,
      default: false,
    },
    Point: {
      type:Number,
      default:0
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model('tree_contract', treeSchema);
