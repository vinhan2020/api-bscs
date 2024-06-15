const express = require('express')
const router = express.Router()
const AddLPController = require('../controller/addLiquid')

router.get('/info', AddLPController.getAddLPInfo);
router.post('/create', AddLPController.CreateAddLiqInfo);
router.post('/save-hash', AddLPController.saveHashAddLP);

module.exports = router