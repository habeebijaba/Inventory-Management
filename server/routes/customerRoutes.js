const express = require('express')

const router = express.Router()
const verifyToken = require('../middleware/verrifyToken.js')


const {
    getCustomers,
    getCustomerSalesReport,
    addCustomer,

} = require('../controllers/customerController')

router.get("/", getCustomers)
router.get("/:id", getCustomerSalesReport)
router.post("/", addCustomer)


module.exports = router