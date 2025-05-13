const express = require('express')
const productsController = require('../controller/produk.js')
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
router.use(verifyToken);

router.get('/', productsController.getAllProducts)

router.post('/', productsController.createNewProducts)
router.put('/:idProducts', productsController.updateProducts)
router.delete('/:idProducts', productsController.deleteProducts)

module.exports = router;