const express = require('express')
const router = express.Router()
const Controller = require('../controllers/contollerCostumer')

router.get('/clothes', Controller.readProduct)
router.get('/clothes/:id', Controller.detailProduct)

module.exports = router