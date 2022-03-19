const mongoose = require('mongoose')

// const { databse } = require('../Config/Database')

const contentSchema = new mongoose.Schema({
    Address: {
        type: String,
        default: ""
    },
    Transaction: {
        type: String,
        default: ""
    },
    Amount: {
        type: Number,
        default: 0
    },
    Status: {
        type: Number,
        default: 0
    }
}, { timestamps: true })

module.exports = mongoose.model('presale_claim', contentSchema)
