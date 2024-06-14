const tokenRouter = require('./token')
const lockLPRouter = require('./lockLp')
function route(app)
{
    app.use('/token', tokenRouter)
    app.use('/lock-lp', lockLPRouter)
}
module.exports = route 