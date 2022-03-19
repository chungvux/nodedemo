const mongoose = require('mongoose');
const {
  toJSON,
  paginate
} = require('./plugins');
const {
  TYPE_EVENT
} = require('../constants/utils')


const eventSchema = mongoose.Schema({
  description: {
    type: String
  },
  typeEvent: {
    type: TYPE_EVENT
  }
}, {
  timestamps: true,
});

eventSchema.plugin(toJSON);
eventSchema.plugin(paginate);

const event = mongoose.model('event', eventSchema);

module.exports = event;
