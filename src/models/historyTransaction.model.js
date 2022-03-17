const mongoose = require('mongoose');
const {
  toJSON,
  paginate
} = require('./plugins');

const { TYPE_TRANSACTION, TYPE_ITEM  } = require('../constants/history')

const historyTransactionSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  transactionTime: {
    type: Date,
    default: new Date().getTime(),
    required: true
  },
  transaction: {
    type: TYPE_TRANSACTION,
    required: true
  },
  item: {
    type: TYPE_ITEM,
    required: true
  },
  amount: {
    type: Number,
    default: 0,
  },
  status:{
    type:Boolean
  }

}, {
  _id: true,
  timestamps: true,
})

historyTransactionSchema.plugin(toJSON);
historyTransactionSchema.plugin(paginate);

const HistoryTransaction = mongoose.model('HistoryTransaction', historyTransactionSchema);

module.exports = HistoryTransaction;
