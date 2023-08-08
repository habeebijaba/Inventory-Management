const Sale = require('../models/sale.js')
const Customer = require('../models/customer.js')
const Product = require('../models/product.js')

const findTopCustomersWithTotalAmount = async (req, res) => {
    try {
        const topCustomers = await Sale.aggregate([
            {
                $group: {
                    _id: '$customer', 
                    totalAmount: { $sum: '$totalAmount' }, // totalAmount spent by each customer
                },
            },
            {
                $sort: { totalAmount: -1 },
            },
            {
                $limit: 7,
            },
        ]);

        const customerIds = topCustomers.map(item => item._id);

        const topCustomerDetails = await Customer.aggregate([
            {
                $match: { _id: { $in: customerIds } },
            },
            {
                $lookup: {
                    from: 'sales',
                    localField: '_id',
                    foreignField: 'customer',
                    as: 'sales',
                },
            },
            {
                $addFields: {
                    totalPurchaseAmount: { $sum: '$sales.totalAmount' }, //  total purchase amount for each customer
                },
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    email: 1,
                    totalPurchaseAmount: 1,
                },
            },
            {
                $sort: { totalPurchaseAmount: -1 },
            },
        ]);

        res.status(200).json(topCustomerDetails)
    } catch (error) {
        console.error('Error finding top customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });

    }
};

const getTotalUsersWithLastWeekUsersData = async (req, res) => {
    try {

        const totalUsers = await Customer.countDocuments();

        const lastWeekUsersData = await Customer.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dayOfWeek: '$createdAt',
                    },
                    users: { $sum: 1 },
                },
            },
        ]);

        const chartData = [
            { name: "Sun", users: 0 },
            { name: "Mon", users: 0 },
            { name: "Tue", users: 0 },
            { name: "Wed", users: 0 },
            { name: "Thu", users: 0 },
            { name: "Fri", users: 0 },
            { name: "Sat", users: 0 },
        ];

        lastWeekUsersData.forEach(item => {
            const dayIndex = item._id - 1;
            chartData[dayIndex].users = item.users;
        });

        const result = {
            color: "#8884d8",
            icon: "/userIcon.svg",
            title: "Total Users",
            number: totalUsers.toString(),
            dataKey: "users",
            percentage: 5,
            chartData,
        };

        res.status(200).json(result)
    } catch (error) {
        console.error('Error retrieving user data:', error);
        res.status(500).json(error)
    }
};

const getTotalProductsWithLastWeekProductData = async (req, res) => {
    try {
        const totalProducts = await Product.countDocuments();

        const lastWeekProductData = await Product.aggregate([
            {
                $match: {
                    createdAt: {
                        $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dayOfWeek: '$createdAt',
                    },
                    products: { $sum: 1 },
                },
            },
        ]);

        const chartData = [
            { name: "Sun", products: 0 },
            { name: "Mon", products: 0 },
            { name: "Tue", products: 0 },
            { name: "Wed", products: 0 },
            { name: "Thu", products: 0 },
            { name: "Fri", products: 0 },
            { name: "Sat", products: 0 },
        ];

        lastWeekProductData.forEach(item => {
            const dayIndex = item._id - 1;
            chartData[dayIndex].products = item.products;
        });

        const result = {
            color: "#53c79f",
            icon: "/productIcon.svg",
            title: "Total Products",
            number: totalProducts.toString(),
            dataKey: "products",
            percentage: 8,
            chartData,
        };

        res.status(200).json(result)
    } catch (error) {
        console.error('Error retrieving product data:', error);
        res.status(500).json(error)
    }
};

const getTotalSalesWithLastWeekSalesData = async (req, res) => {
    try {
        const totalSales = await Sale.countDocuments();

        const lastWeekSalesData = await Sale.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dayOfWeek: '$date',
                    },
                    sales: { $sum: 1 },
                },
            },
        ]);

        const chartData = [
            { name: "Sun", sales: 0 },
            { name: "Mon", sales: 0 },
            { name: "Tue", sales: 0 },
            { name: "Wed", sales: 0 },
            { name: "Thu", sales: 0 },
            { name: "Fri", sales: 0 },
            { name: "Sat", sales: 0 },
        ];

        lastWeekSalesData.forEach(item => {
            const dayIndex = item._id - 1;
            chartData[dayIndex].sales = item.sales;
        });

        const result = {
            color: "#f36f6f",
            icon: "/userIcon.svg",
            title: "Total Sales",
            number: totalSales.toString(),
            dataKey: "sales",
            percentage: 15,
            chartData,
        };

        res.status(200).json(result)
    } catch (error) {
        console.error('Error retrieving sales data:', error);
        res.status(500).json(error)
    }
};

const getTotalRevenue = async (req, res) => {
    try {
        const totalRevenueResult = await Sale.aggregate([
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalAmount' },
                },
            },
        ]);

        const totalRevenue = totalRevenueResult[0]?.totalRevenue || 0;

        const weeklyRevenueData = await Sale.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dayOfWeek: '$date',
                    },
                    revenue: { $sum: '$totalAmount' },
                },
            },
        ]);

        const chartData = [
            { name: "Sun", revenue: 0 },
            { name: "Mon", revenue: 0 },
            { name: "Tue", revenue: 0 },
            { name: "Wed", revenue: 0 },
            { name: "Thu", revenue: 0 },
            { name: "Fri", revenue: 0 },
            { name: "Sat", revenue: 0 },
        ];

        weeklyRevenueData.forEach(item => {
            const dayIndex = item._id - 1;
            chartData[dayIndex].revenue = item.revenue;
        });

        const result = {
            color: "#f6c90e",
            icon: "/revenueIcon.svg",
            title: "Total Revenue",
            number: `₹ ${totalRevenue.toFixed(2)}`, //2 decml points
            dataKey: "revenue",
            percentage: 25,
            chartData,
        };

        res.status(200).json(result)
    } catch (error) {
        console.error('Error retrieving revenue data:', error);
        res.status(500).json(error)
    }
};

const getTodaySalesData = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0); //set time to begng of day

        const todaySalesData = await Sale.find({
            date: { $gte: today },
        });

        const totalTodaySales = todaySalesData.length;

        const result = {
            color: "#6ce8b8",
            icon: "/productIcon.svg",
            title: "Today's Sales",
            number: totalTodaySales.toString(),
            dataKey: "todaySales",
            percentage: 8,
        };

        res.status(200).json(result)
    } catch (error) {
        console.error("Error retrieving today's sales data:", error);
        res.status(200).json(error)
    }
};

const getTodayRevenueData = async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const todayRevenueResult = await Sale.aggregate([
            {
                $match: {
                    date: { $gte: today },
                },
            },
            {
                $group: {
                    _id: null,
                    totalRevenue: { $sum: '$totalAmount' },
                },
            },
        ]);

        const totalTodayRevenue = todayRevenueResult[0]?.totalRevenue || 0;

        const result = {
            color: "#f6c90e",
            icon: "/userIcon.svg",
            title: "Today's Revenue",
            number: `₹ ${totalTodayRevenue.toFixed(2)}`,
            dataKey: "todayRevenue",
            percentage: 6,
        };

        res.status(200).json(result)
    } catch (error) {
        console.error("Error retrieving today's revenue data:", error);
        res.status(500).json(error)
    }
};

const getRevenueAnalysisData = async (req, res) => {
    try {
        const lastWeekSalesData = await Sale.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dayOfWeek: '$date',
                    },
                    sales: { $sum: 1 },
                },
            },
        ]);

        const weeklyRevenueData = await Sale.aggregate([
            {
                $match: {
                    date: {
                        $gte: new Date(new Date() - 7 * 24 * 60 * 60 * 1000),
                    },
                },
            },
            {
                $group: {
                    _id: {
                        $dayOfWeek: '$date',
                    },
                    revenue: { $sum: '$totalAmount' },
                },
            },
        ]);

        const combinedChartData = [];

        for (let dayIndex = 0; dayIndex < 7; dayIndex++) {
            const dayName = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"][dayIndex];
            const salesItem = lastWeekSalesData.find(item => item._id === dayIndex + 1) || { sales: 0 };
            const revenueItem = weeklyRevenueData.find(item => item._id === dayIndex + 1) || { revenue: 0 };

            combinedChartData.push({
                name: dayName,
                sales: salesItem.sales,
                revenue: revenueItem.revenue,
            });
        }
        res.status(200).json(combinedChartData)
    } catch (error) {
        res.status(500).json(error)
    }
}

const generateReport=async(interval)=> {
    const today = new Date();

    let startDate, endDate;

    switch (interval) {
        case 'Today':
            startDate = new Date(today);
            startDate.setHours(0, 0, 0, 0);
            endDate = new Date(today);
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'Current week':
            startDate = new Date(today);
            startDate.setDate(today.getDate() - today.getDay());
            endDate = new Date(today);
            endDate.setDate(today.getDate() + (6 - today.getDay()));
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'Current month':
            startDate = new Date(today.getFullYear(), today.getMonth(), 1);
            endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
            endDate.setHours(23, 59, 59, 999);
            break;
        case 'Current year':
            startDate = new Date(today.getFullYear(), 0, 1);
            endDate = new Date(today.getFullYear(), 11, 31);
            endDate.setHours(23, 59, 59, 999);
            break;
        default:
            throw new Error('Invalid interval');
    }

    const [salesData, newCustomerCount, newProductCount] = await Promise.all([
        Sale.aggregate([
            {
                $match: {
                    date: { $gte: startDate, $lte: endDate },
                },
            },
            {
                $group: {
                    _id: null,
                    totalAmount: { $sum: '$totalAmount' },
                    numProductsSold: { $sum: '$quantity' },
                    numSales: { $sum: 1 },
                },
            },
        ]),
        Customer.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
        }),
        Product.countDocuments({
            createdAt: { $gte: startDate, $lte: endDate },
        }),
    ]);

    return {
        totalRevenue: salesData[0]?.totalAmount || 0,
        averageRevenue: (salesData[0]?.totalAmount / salesData[0]?.numSales).toFixed(3) || 0,
        numProductsSold: salesData[0]?.numProductsSold || 0,
        numSales: salesData[0]?.numSales || 0,
        newCustomers: newCustomerCount,
        newProducts: newProductCount,
    };
}

const generateSalesReports = async (req, res) => {

    try {
        const intervals = ['Today', 'Current week', 'Current month', 'Current year'];
        const results = [];

        for (const interval of intervals) {
            const result = await generateReport(interval);
            results.push({ field: interval, ...result });
        }

        res.status(200).json(results)

    } catch (error) {
        res.status(500).json(error)
    }
}


module.exports = {
    findTopCustomersWithTotalAmount,
    getTotalUsersWithLastWeekUsersData,
    getTotalProductsWithLastWeekProductData,
    getTotalSalesWithLastWeekSalesData,
    getTotalRevenue,
    getTodaySalesData,
    getTodayRevenueData,
    getRevenueAnalysisData,
    generateSalesReports

}