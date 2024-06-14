const express = require('express')
const app = express()
const route = require('./routes')
const db = require('./db/connect')
const cors = require('cors')
const path = require('path')
const port = 8080
const corsOption = {
    "origin": "*",
    "methods": "POST,HEAD,PUT,GET,PATCH,DELETE",
}
db.connectDB()
app.use(cors(corsOption))
app.use("/static", express.static(path.join(__dirname, "public/images")));

// error handling middleware ok ok
app.use(express.urlencoded({
    extended: true
}))
app.use(express.json())
route(app)

server.listen(port, async () =>
{
    await botControl()
    console.log(`Example app listening at http://localhost:${port}`)
})