const express = require('express')

const router = express.Router()
const verifyToken = require('../middleware/verrifyToken.js')


const {
    getProducts,
    getProductSalesReport,
    addProduct,
    deleteProduct,
    editProduct,

} = require('../controllers/producttController')

router.get("/", getProducts)
router.get("/:id", getProductSalesReport)
router.post("/", addProduct)
router.put("/", editProduct)

router.delete("/:id", deleteProduct)


module.exports = router