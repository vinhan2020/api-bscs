const consts = require('../constants/httpCode')
const Token = require('../models/token')
const { returnError, returnSuccess } = require('../helpers/returnRequest')
class TokenController
{
    async CreateToken(req, res, next)
    {
        const { tokenName, tokenSymbol, decimals, totalSupply } = req.body
        if (!tokenName)
        {
            return returnError(req, res, "Missing tokenName", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!tokenSymbol)
        {
            return returnError(req, res, "Missing tokenSymbol", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!decimals)
        {
            return returnError(req, res, "Missing decimals", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!totalSupply)
        {
            return returnError(req, res, "Missing totalSupply", consts.httpStatusCodes.NOT_FOUND, null)
        }
        await Token.findOne({ tokenName, tokenSymbol })
            .then(async dataToken =>
            {
                if (dataToken)
                {
                    return returnError(req, res, "Token already exist", consts.httpStatusCodes.BAD_REQUEST, null)
                }
                const newToken = new Token({
                    tokenName,
                    tokenSymbol,
                    decimals,
                    totalSupply
                })
                await newToken.save()
                    .then(() =>
                    {
                        return returnSuccess(req, res, "Create new token success", consts.httpStatusCodes.BAD_REQUEST, null)
                    })
                    .catch(e =>
                    {
                        return returnError(req, res, "Create new token failed", consts.httpStatusCodes.BAD_REQUEST, e)
                    })
            })
            .catch(e =>
            {
                return returnError(req, res, "Token not found", consts.httpStatusCodes.BAD_REQUEST, e)
            })
    }

    async GetListToken(req, res, next)
    {
        await Token.find()
            .then(listToken =>
            {
                return returnSuccess(req, res, "Get list token success", consts.httpStatusCodes.BAD_REQUEST, listToken)
            })
            .catch(e =>
            {
                return returnError(req, res, "Get list token failed", consts.httpStatusCodes.BAD_REQUEST, e)
            })
    }

    async SaveHash(req, res, next)
    {
        const { tokenName, tokenSymbol, txHash } = req.body
        if (!tokenName)
        {
            return returnError(req, res, "Missing tokenName", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!tokenSymbol)
        {
            return returnError(req, res, "Missing tokenSymbol", consts.httpStatusCodes.NOT_FOUND, null)
        }
        if (!txHash)
        {
            return returnError(req, res, "Missing txHash", consts.httpStatusCodes.NOT_FOUND, null)
        }
        await Token.findOne({ tokenName })
            .then(async dataToken =>
            {
                if (dataToken)
                {
                    await Token.findOneAndUpdate({ tokenName, tokenSymbol }, {
                        $set: {
                            txHash: txHash
                        }
                    }, {
                        returnOriginal: false
                    })
                        .then(dataUpdate =>
                        {
                            return returnSuccess(req, res, "update txHash success", consts.httpStatusCodes.BAD_REQUEST, dataUpdate)
                        })
                        .catch(e =>
                        {
                            return returnError(req, res, "Udpate txHash failed", consts.httpStatusCodes.BAD_REQUEST, e)
                        })
                } else
                {
                    return returnError(req, res, "Token not found", consts.httpStatusCodes.BAD_REQUEST, null)
                }
            })
            .catch(e =>
            {
                return returnError(req, res, "Some thing went wrong with save hash token", consts.httpStatusCodes.BAD_REQUEST, e)
            })
    }
}

module.exports = new TokenController()