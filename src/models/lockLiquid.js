const mongoose = require('mongoose')

const LockLiquid = mongoose.Schema({
    pairAddress: {
        type: String,
        default: ''
    },
    decimals: {
        type: String,
        default: ''
    },
    title: {
        type: String,
        default: ''
    },
    owner: {
        type: String,
        default: ''
    },
    amount: {
        type: String,
        default: ""
    },
    lockUntil: {
        type: Date,
        default: Date.now()
    },
    txHash: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('lock_liquids', LockLiquid)

