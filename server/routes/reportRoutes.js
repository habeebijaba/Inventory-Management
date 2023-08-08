const express = require('express')

const router = express.Router()
const verifyToken=require('../middleware/verrifyToken.js')


const {
    findTopCustomersWithTotalAmount,
    getTotalUsersWithLastWeekUsersData,
    getTotalProductsWithLastWeekProductData,
    getTotalSalesWithLastWeekSalesData,
    getTotalRevenue,
    getTodaySalesData,
    getTodayRevenueData,
    getRevenueAnalysisData,
    generateSalesReports
} = require('../controllers/reportController')

router.get("/topDeals", findTopCustomersWithTotalAmount)
router.get("/totalUsers", getTotalUsersWithLastWeekUsersData)
router.get("/totalProducts", getTotalProductsWithLastWeekProductData)
router.get("/totalSales", getTotalSalesWithLastWeekSalesData)
router.get("/totalRevenue", getTotalRevenue)
router.get("/todaySales", getTodaySalesData)
router.get("/todayRevenue", getTodayRevenueData)
router.get("/revenueAnalysis", getRevenueAnalysisData)
router.get("/salesReports", generateSalesReports)











module.exports = router