const AppToResponse = require('../models/response')
const User = require("../models/user")
const date = require('date-and-time')
function returnError(req, res, errMessage, code, data)
{
    const respModel = new AppToResponse({
        success: false,
        message: errMessage,
        errorCode: code,
        data: data,
    })
    res.status(code).json(respModel)
}

function returnSuccess(req, res, errMessage, code, data)
{
    const respModel = new AppToResponse({
        success: true,
        message: errMessage,
        errorCode: code,
        data: data,
    })
    res.status(code).json(respModel)
}

async function updateCurrentDailyReward()
{
    await User.updateMany({
        $set: {
            fullEnerfyPerDate: 6
        }
    })
}

async function emitLevel(balance)
{
    return new Promise(resolve =>
    {
        let level = 1
        if (balance >= 200000 && balance < 2000000)
        {
            level = 2;
        } else if (balance >= 2000000 && balance < 5000000)
        {
            level = 3;
        } else if (balance >= 5000000 && balance < 25000000)
        {
            level = 4;
        } else if (balance >= 25000000 && balance < 50000000)
        {
            level = 5;
        } else if (balance >= 50000000 && balance < 100000000)
        {
            level = 6;
        } else if (balance >= 100000000 && balance < 200000000)
        {
            level = 7;
        } else if (balance >= 200000000 && balance < 500000000)
        {
            level = 8;
        } else if (balance >= 500000000 && balance < 1000000000)
        {
            level = 9;
        } else if (balance >= 1000000000)
        {
            level = 10;
        } else
        {
            level = 1; // Mặc định cho các giá trị nhỏ hơn 5000
        }
        resolve(level)
    })
}

module.exports = { returnError, returnSuccess, updateCurrentDailyReward, emitLevel }    