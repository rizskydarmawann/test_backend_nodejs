const express = require('express')
const productsController = require('../controller/produk.js')
const router = express.Router();


router.get('/', productsController.getAllProducts)

router.post('/', productsController.createNewProducts)
router.put('/:idProducts', productsController.updateProducts)
router.delete('/:idProducts', productsController.deleteProducts)

module.exports = router;