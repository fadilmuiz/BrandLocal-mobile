const express = require('express')
const router = express.Router()
const Controller = require("../controllers/controllers");
const costumerRouter = require('./costumerRouter')

router.use('/public', costumerRouter)

// router product
router.get('/clothes', Controller.readClothes)
router.post('/clothes', Controller.addProduct)
router.get('/clothes/:id', Controller.clothesDetail)
router.put('/clothes/:id', Controller.editProduct)
router.delete('/clothes/:id', Controller.deleteProduct)
// router category
router.get('/category', Controller.readCategory)
router.post('/category', Controller.addCategory)
router.get('/category/:id', Controller.categoryDetail)
router.put('/category/:id', Controller.editCategory)   
router.delete('/category/:id', Controller.deleteCategory)
// router image
router.get('/image/:id', Controller.imageDetail)

module.exports = router