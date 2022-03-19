const mongoose = require('mongoose');
const {
  toJSON,
  paginate
} = require('./plugins');


const clanSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    type: String
  },
  waitingMember: {
    type: [String]
  },
  member: {
    type: [String]
  },
  globalRanking: {
    type: Number,
    default: 0
  },
  language: {
    type: String,
    default: "English"
  },
  privacy: {
    type: Boolean,
    default: true
  },
  score: {
    type: Number,
    default: 0
  },
  owner: {
    type: String,
    ref: 'tree_contract'
  },
  requiredPoint: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true,
});

clanSchema.plugin(toJSON);
clanSchema.plugin(paginate);

const clan = mongoose.model('clan', clanSchema);

module.exports = clan;
