const express = require('express')
const router = express.Router()
const TokenController = require('../controller/token')

router.get('/list', TokenController.GetListToken);
router.post('/create', TokenController.CreateToken);
router.post('/save-hash', TokenController.SaveHash);

module.exports = router