const mongoose = require('mongoose')
const dotenv = require('dotenv')
dotenv.config()

async function connectDB()
{
    try
    {
        mongoose.set('strictQuery', false)
        var connString = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}/${process.env.DB_NAME}`
        if (process.env.NODE_ENV === 'dev')
        {
            connString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASSWORD}@${process.env.DB_HOST}:${process.env.DB_PORT}`
        }
        console.log("connString", connString)
        await mongoose.connect(connString)
        console.log('Connect DB Successfully!!!')
    } catch {
        console.log('Connect DB Failure!!!')
    }
}

module.exports = { connectDB }