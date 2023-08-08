const mongoose = require('mongoose')

const customerSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true,
    },
    street: {
        type: String,

    },
    pincode: {
        type: String
    },
    state: {
        type: String

    },
    house: {
        type: String
    },
    district: {
        type: String

    }
},
    {
        timestamps: true
    })

const Customer = mongoose.model("Customer", customerSchema)
module.exports = Customer