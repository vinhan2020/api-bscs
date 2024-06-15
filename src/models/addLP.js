const mongoose = require('mongoose')

const AddLiquid = mongoose.Schema({
    countractTokenA: {
        type: String,
        default: ''
    },
    countractTokenB: {
        type: String,
        default: ''
    },
    amountTokenA: {
        type: String,
        default: ''
    },
    amountTokenB: {
        type: String,
        default: ''
    },
    owner: {
        type: String,
        default: ""
    },
    pairAddress: {
        type: String,
        default: Date.now()
    },
    symbolTokenA: {
        type: String,
        default: ''
    },
    symbolTokenB: {
        type: String,
        default: ''
    },
    txHash: {
        type: String,
        default: ""
    }
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('add_liquids', AddLiquid)

