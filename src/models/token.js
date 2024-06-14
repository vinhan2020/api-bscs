const mongoose = require('mongoose')

const Token = mongoose.Schema({
    tokenName: {
        type: String,
        default: ''
    },
    tokenSymbol: {
        type: String,
        default: ''
    },
    decimals: {
        type: String,
        default: 0
    },
    totalSupply: {
        type: String,
        default: 0
    },
    txHash: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('tokens', Token)

