const mongoose = require('mongoose')

// const { databse } = require('../Config/Database')

const contentSchema = new mongoose.Schema({
    Address: {
        type: String,
        default: ""
    },
    Type: {
        type: String,
        default: "public"
    },
    Transaction: {
        type: String,
        default: ""
    },
    Amount: {
        type: Array,
        default: []
    },
    Status: {
        type: Number,
        default: 0
    },
    Unlock: {
        type: Date,
        default: ""
    }
}, { timestamps: true })

module.exports = mongoose.model('presale', contentSchema)
