const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const landDataSchema = mongoose.Schema(
  {
    array:[]
  },
  {
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
landDataSchema.plugin(toJSON);
landDataSchema.plugin(paginate);

const landData = mongoose.model('landId', landDataSchema);

module.exports = landData;
