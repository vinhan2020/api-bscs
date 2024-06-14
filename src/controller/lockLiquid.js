const consts = require('../constants/httpCode')
const LockLiquid = require('../models/loclLiquid')
const { returnError, returnSuccess } = require('../helpers/returnRequest')
const loclLiquid = require('../models/loclLiquid')
const e = require('express')
class LockLiquidController
{
    async CreateLockLiqInfo()
    {
        const { title, owner, amount, lickUntil, pair, decimals } = req.body
        if (!pair)
        {
            return returnError(req, res, "Missing pair", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!title)
        {
            return returnError(req, res, "Missing title", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!owner)
        {
            return returnError(req, res, "Missing owner", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!amount)
        {
            return returnError(req, res, "Missing amount", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!lickUntil)
        {
            return returnError(req, res, "Missing lickUntil", consts.httpStatusCodes.NOT_FOUND, null)
        }
        await loclLiquid.findOne({ pair, owner })
            .then(async dataLock =>
            {
                if (!dataLock)
                {
                    return returnError(req, res, "Lock info not found", consts.httpStatusCodes.NOT_FOUND, null)
                }
                const newLock = new LockLiquid({
                    pair,
                    decimals,
                    tokenName,
                    tokenSymbol,
                    decimals,
                    totalSupply
                })
                await newLock.save()
                    .then(() =>
                    {
                        return returnSuccess(req, res, "Create lock lp success", consts.httpStatusCodes.OK, newLock)
                    })
                    .catch(e =>
                    {
                        return returnError(req, res, "Create lock lp failed", consts.httpStatusCodes.BAD_REQUEST, e)
                    })
            })
    }

    async getLockLPInfo()
    {
        var query = require('url').parse(req.url, true).query
        const pair = query.pair
        const owner = query.owner
        if (!pair)
        {
            return returnError(req, res, "Missing pair", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!owner)
        {
            return returnError(req, res, "Missing owner", consts.httpStatusCodes.NOT_FOUND, null)
        }
        await LockLiquid.findOne({ owner, pair })
            .then(dataLock =>
            {
                if (!dataLock)
                {
                    return returnError(req, res, "Lock info not found", consts.httpStatusCodes.NOT_FOUND, null)
                }
                return returnSuccess(req, res, "Get Lock info success", consts.httpStatusCodes.OK, dataLock)
            })
            .catch(e =>
            {
                return returnError(req, res, "Something went wrong", consts.httpStatusCodes.BAD_REQUEST, e)
            })
    }

    async saveHashLockLP()
    {
        const { txHash, pair, owner } = req.body
        if (!txHash)
        {
            return returnError(req, res, "Missing txHash", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!pair)
        {
            return returnError(req, res, "Missing pair", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!owner)
        {
            return returnError(req, res, "Missing owner", consts.httpStatusCodes.NOT_FOUND, null)
        }
        await LockLiquid.findOne({ pair, owner })
            .then(async dataLock =>
            {
                if (!dataLock)
                {
                    return returnError(req, res, "Lock info not found", consts.httpStatusCodes.NOT_FOUND, null)
                }
                await LockLiquid.findOneAndUpdate({ owner, pair }, {
                    $set: {
                        txHash: txHash
                    }
                }, {
                    returnOriginal: false
                })
                    .then(dataLockUpdate =>
                    {
                        return returnSuccess(req, res, "Save txHash Lock lp success", consts.httpStatusCodes.OK, dataLockUpdate)
                    })
                    .catch(e =>
                    {
                        return returnError(req, res, "Save txHash lock lp failed", consts.httpStatusCodes.BAD_REQUEST, null)

                    })
            })
            .catch(e =>
            {
                return returnError(req, res, "Something went wrong save txHash lock lp", consts.httpStatusCodes.BAD_REQUEST, e)
            })
    }
}

module.exports = new LockLiquidController()