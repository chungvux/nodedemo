const mongoose = require('mongoose');
const {
  toJSON,
  paginate
} = require('./plugins');

const roomSchema = mongoose.Schema({
  name: {
    type: String
  },
  HBG: {
    type: Number
  },
  mode: {
    type: String
  },
  member: {
    type: [String]
  }
}, {
  timestamps: true,
});

roomSchema.plugin(toJSON);
roomSchema.plugin(paginate);

const room = mongoose.model('room', roomSchema);

module.exports = room;
