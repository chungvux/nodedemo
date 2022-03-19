const mongoose = require('mongoose')

// const { databse } = require('../Config/Database')

const contentSchema = new mongoose.Schema({
    Price: {
        type: Number,
        default: 0.044
    },
    MaxPresale: {
        type: Number,
        default: 90000000
    },
    TimeStart: {
        type: Date,
    },
    TimeEnd: {
        type: Date,
    },
    Requirement: {
        type: String,
    },
    Vesting : {
        type: String,
    },
    ClaimDate : {
        type: Date,
    },


}, { timestamps: true })

module.exports = mongoose.model('presale_setting', contentSchema)
