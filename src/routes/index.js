const tokenRouter = require('./token')
const lockLPRouter = require('./lockLp')
const addLPRouter = require('./addLP')
function route(app)
{
    app.use('/token', tokenRouter)
    app.use('/lock-lp', lockLPRouter)
    app.use('/add-lp', addLPRouter)
}
module.exports = route 