const consts = require('../constants/httpCode')
const AddLiquid = require('../models/addLP')
const { returnError, returnSuccess } = require('../helpers/returnRequest')
class AddLiquidController
{
    async CreateAddLiqInfo(req, res, next)
    {
        const { countractTokenA, countractTokenB, amountTokenA, amountTokenB, owner, pairAddress, symbolTokenA, symbolTokenB } = req.body
        if (!countractTokenA)
        {
            return returnError(req, res, "Missing countractTokenA", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!countractTokenB)
        {
            return returnError(req, res, "Missing countractTokenB", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!amountTokenA)
        {
            return returnError(req, res, "Missing amountTokenA", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!amountTokenB)
        {
            return returnError(req, res, "Missing amountTokenB", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!pairAddress)
        {
            return returnError(req, res, "Missing pairAddress", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!owner)
        {
            return returnError(req, res, "Missing owner", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!symbolTokenA)
        {
            return returnError(req, res, "Missing symbolTokenA", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!symbolTokenB)
        {
            return returnError(req, res, "Missing symbolTokenB", consts.httpStatusCodes.NOT_FOUND, null)
        }
        await AddLiquid.findOne({ pairAddress, owner })
            .then(async dataAddLP =>
            {
                if (dataAddLP)
                {
                    return returnError(req, res, `Add LP info of ower: ${owner} - pair: ${pairAddress} is already exist`, consts.httpStatusCodes.NOT_FOUND, null)
                }
                const newAdd = new AddLiquid({
                    countractTokenA,
                    countractTokenB,
                    amountTokenA,
                    amountTokenB,
                    pairAddress,
                    owner,
                    symbolTokenA,
                    symbolTokenB
                })
                await newAdd.save()
                    .then(() =>
                    {
                        return returnSuccess(req, res, "Create add lp success", consts.httpStatusCodes.OK, newAdd)
                    })
                    .catch(e =>
                    {
                        return returnError(req, res, "Create add lp failed", consts.httpStatusCodes.BAD_REQUEST, e)
                    })
            })
            .catch(e =>
            {
                return returnError(req, res, "Some thing went wrong with Add LP", consts.httpStatusCodes.BAD_REQUEST, e)
            })
    }

    async getAddLPInfo(req, res, next)
    {
        var query = require('url').parse(req.url, true).query
        const pairAddress = query.pairAddress
        const owner = query.owner
        if (!pairAddress)
        {
            return returnError(req, res, "Missing pairAddress", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!owner)
        {
            return returnError(req, res, "Missing owner", consts.httpStatusCodes.NOT_FOUND, null)
        }
        await AddLiquid.findOne({ owner, pairAddress })
            .then(dataAddLP =>
            {
                if (!dataAddLP)
                {
                    return returnError(req, res, "Add LP info not found", consts.httpStatusCodes.NOT_FOUND, null)
                }
                return returnSuccess(req, res, "Get Add LP info success", consts.httpStatusCodes.OK, dataAddLP)
            })
            .catch(e =>
            {
                return returnError(req, res, "Something went wrong", consts.httpStatusCodes.BAD_REQUEST, e)
            })
    }

    async saveHashAddLP(req, res, next)
    {
        const { txHash, pairAddress, owner } = req.body
        if (!txHash)
        {
            return returnError(req, res, "Missing txHash", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!pairAddress)
        {
            return returnError(req, res, "Missing pairAddress", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!owner)
        {
            return returnError(req, res, "Missing owner", consts.httpStatusCodes.NOT_FOUND, null)
        }
        await AddLiquid.findOne({ pairAddress, owner })
            .then(async dataAddLP =>
            {
                if (!dataAddLP)
                {
                    return returnError(req, res, "Add LP info not found", consts.httpStatusCodes.NOT_FOUND, null)
                }
                await AddLiquid.findOneAndUpdate({ owner, pairAddress }, {
                    $set: {
                        txHash: txHash
                    }
                }, {
                    returnOriginal: false
                })
                    .then(dataAddLPUpdate =>
                    {
                        return returnSuccess(req, res, "Save txHash add lp success", consts.httpStatusCodes.OK, dataAddLPUpdate)
                    })
                    .catch(e =>
                    {
                        return returnError(req, res, "Save txHash add lp failed", consts.httpStatusCodes.BAD_REQUEST, e)

                    })
            })
            .catch(e =>
            {
                return returnError(req, res, "Something went wrong save txHash add lp", consts.httpStatusCodes.BAD_REQUEST, e)
            })
    }
}

module.exports = new AddLiquidController()