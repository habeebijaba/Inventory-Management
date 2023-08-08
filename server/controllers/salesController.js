const Sale = require('../models/sale.js')
const Product = require('../models/product.js')
const mongoose = require('mongoose')
const ObjectId = mongoose.Types.ObjectId;

const getSales = async (req, res) => {
  try {
    const allSales = await Sale.find()
      .populate('customer', 'name') 
      .populate('product', 'name');  

    res.status(200).json(allSales);
    console.log(allSales,"this is allsales");
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

const addSales = async (req, res) => {
  try {
    const {
      customer,
      product,
      date,
      totalAmount,
      quantity,
      cashPaid,
    } = req.body.formData;

    const newSale = new Sale({
      customer: new mongoose.Types.ObjectId(customer),
      product: new mongoose.Types.ObjectId(product),
      date: new Date(date),
      totalAmount: parseFloat(totalAmount),
      quantity: parseInt(quantity),
      cashPaid: parseFloat(cashPaid),
      balance: parseFloat(totalAmount) - parseFloat(cashPaid)
    });

    const savedSale = await newSale.save();

    const populatedSale = await Sale.findById(savedSale._id)
    .populate('customer', 'name')
    .populate('product', 'name')
    .lean(); // Convertedd to plain js objectttt


    const updatedProduct = await Product.findByIdAndUpdate(
      product,
      { $inc: { stock: -parseInt(quantity) } },
      { new: true }
    );

    res.status(201).json(populatedSale);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'An error occurred' });
  }
}

module.exports = {
  addSales,
  getSales,
}