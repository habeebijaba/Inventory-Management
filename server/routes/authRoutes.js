const express = require('express')
const router = express.Router()
const verifyToken=require('../middleware/verrifyToken.js')

const {
    signUp,
    login,
    logout,
    getAuthRequests,
    aproveRequests,
}
    = require('../controllers/authController')

router.post('/signup', signUp)
router.post('/login', login)
router.post('/logout', logout)
router.get("/requests",getAuthRequests)
router.put("/requests/:id",aproveRequests)



module.exports = router