const express = require('express')
const router = express.Router()
const lockLPController = require('../controller/lockLiquid')

router.get('/info', lockLPController.getLockLPInfo);
router.post('/create', lockLPController.CreateLockLiqInfo);
router.post('/save-hash', lockLPController.saveHashLockLP);

module.exports = router