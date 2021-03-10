const mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    orderId: {
        type: Number,
        required: true
    },
    itemName: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    quantity: {
        type: Number,
        required: true
    },
    deliveryAddress: {
        type: String,
        required: true
    },
    deliveryPin: {
        type: Number,
        required: true
    },
    orderStatus :{
        type: String,
        required: true
    }
});

module.exports = mongoose.model('Orders', orderSchema);