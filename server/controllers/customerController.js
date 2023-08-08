const Customer = require('../models/customer.js')
const mongoose = require('mongoose')
const Product = require('../models/product.js')
const Sale = require('../models/sale.js')

const ObjectId = mongoose.Types.ObjectId;


const getCustomers = async (req, res) => {
    try {
        const Customers = await Customer.find();
        res.status(200).json(Customers);
    } catch (error) {
        console.error('Error fetching Customers:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getCustomerSalesReport = async (req, res) => {
    try {
        const customerId = req.params.id

        const customerSales = await Sale.find({ 'customer': new mongoose.Types.ObjectId(customerId) });

        const salesWithProductDetails = await Promise.all(customerSales.map(async (sale) => {
            const product = await Product.findById(sale.product);
            const customer = await Customer.findById(customerId)

            return {
                _id: sale._id,
                date: sale.date,
                totalAmount: sale.totalAmount,
                balance: sale.balance,
                cashPaid: sale.cashPaid,
                quantity: sale.quantity,
                customer: customer.name,
                product: product ? product.name : 'Unknown Product',
                imageURL: product ? product.imageURL : '',
            };
        }));

        res.status(200).json(salesWithProductDetails)
    } catch (error) {
        console.error('Error retrieving customer sales report:', error);
        res.status(500).json(error)
    }
};



const addCustomer = async (req, res) => {

    try {
        const { formData } = req.body

        const newCustomer = new Customer({
            name: formData.name,
            email: formData.email,
            mobile: formData.mobile,
            street: formData.street,
            pincode: formData.pincode,
            state: formData.state,
            house: formData.house,
            district: formData.district
        });
        const savedCustomer = await newCustomer.save();

        res.status(200).json(savedCustomer);
    } catch (error) {
        console.log(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

}


module.exports = {
    addCustomer,
    getCustomers,
    getCustomerSalesReport,

}