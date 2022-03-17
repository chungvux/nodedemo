const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');
const AutoIncrement = require('mongoose-sequence')(mongoose);

const mineralSchema = mongoose.Schema(
  {
    _id: {
      type: Number,
    },
    name: {
      type: String,
      default: '',
    },
    position:{
      type:Array
    },
    latitude: {
      type: Number,
      defaut: 125,
    },
    longitude: {
      type: Number,
      default: 0,
    },
    image: {
      type: String,
      default: '',
    },
    restPoint: {
      type: Number,
      default: 10000,
    },
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  {
    _id: false,
    timestamps: true,
  }
);

// add plugin that converts mongoose to json
mineralSchema.plugin(toJSON);
mineralSchema.plugin(paginate);
mineralSchema.plugin(AutoIncrement, { start_seq: 1 });

const mineral = mongoose.model('mineral', mineralSchema);

module.exports = mineral;
