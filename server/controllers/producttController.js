const Product = require('../models/product.js')
const Sale = require('../models/sale.js')
const mongoose = require('mongoose')
const Customer = require('../models/customer.js')
const ObjectId = mongoose.Types.ObjectId;


const getProducts = async (req, res) => {
    try {
        const products = await Product.find({ isDeleted: false });
        res.status(200).json(products);
    } catch (error) {
        console.error('Error fetching products:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const getProductSalesReport = async (req, res) => {
    try {
        const productId = req.params.id
        const productSales = await Sale.find({ 'product': new mongoose.Types.ObjectId(productId) });

        const salesWithDetails = await Promise.all(productSales.map(async (sale) => {
            const customer = await Customer.findById(sale.customer);
            const product = await Product.findById(sale.product);

            return {
                _id: sale._id,
                date: sale.date,
                totalAmount: sale.totalAmount,
                quantity: sale.quantity,
                cashPaid: sale.cashPaid,
                balance: sale.balance,
                customer: customer ? customer.name : 'Unknown Customer',
                product: product ? product.name : 'Unknown Product',
                // imageURL: product ? product.imageURL : '', 
                // price:product?product.price:''
            };
        }));

        console.log('Product Sales Report:', salesWithDetails);
        res.status(200).json(salesWithDetails)
    } catch (error) {
        console.error('Error retrieving product sales report:', error);
        res.status(500).json(error)
    }
};



const addProduct = async (req, res) => {

    try {
        const { formData, img } = req.body;

        const newProduct = new Product({
            name: formData.name,
            price: parseFloat(formData.price),
            stock: parseInt(formData.stock),
            description: formData.description,
            imageURL: img,
        });

        const savedProduct = await newProduct.save();

        res.status(200).json(savedProduct);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }

}

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;

        await Product.findByIdAndUpdate(id, { $set: { isDeleted: true } });
        const products = await Product.find({ isDeleted: false });

        res.status(200).json(products);
    } catch (error) {
        console.error('Error soft deleting product:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

const editProduct = async (req, res) => {
    try {
        const { editedProduct } = req.body

        const productId = editedProduct._id

        const updatedProduct = {
            name: editedProduct.name,
            price: parseFloat(editedProduct.price),
            stock: parseInt(editedProduct.stock),
            description: editedProduct.description,
            imageURL: editedProduct.imageURL,
        };
        const product = await Product.findByIdAndUpdate(productId, updatedProduct, { new: true });
        if (!product) {
            return res.status(404).json({ error: 'Product not found' });
        }
        res.status(200).json(product);
    } catch (error) {
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

module.exports = {
    addProduct,
    getProductSalesReport,
    getProducts,
    deleteProduct,
    editProduct
}