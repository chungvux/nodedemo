const mongoose = require('mongoose');
const {
  toJSON,
  paginate
} = require('./plugins');

const historyLoginSchema = mongoose.Schema({
  address: {
    type: String,
    required: true,
  },
  loginTime: {
    type: Date,
    default: new Date().getTime(),
  },
  logoutTime: {
    type: Date,
    default: new Date().getTime(),
  },
  isLogin: {
    type: Boolean,
    default: false,
  }
}, {
  _id: true,
  timestamps: true,
})

historyLoginSchema.plugin(toJSON);
historyLoginSchema.plugin(paginate);

const HistoryLogin = mongoose.model('HistoryLogin', historyLoginSchema);

module.exports = HistoryLogin;
