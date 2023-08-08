const express = require('express')

const router = express.Router()
const verifyToken = require('../middleware/verrifyToken.js')


const {
    getSales,
    addSales,
} = require('../controllers/salesController')

router.get("/", getSales)
router.post("/", addSales)


module.exports = router