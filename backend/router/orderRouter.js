const express = require('express');
const bcrypt= require('bcrypt');
const orderRouter = express.Router();
const Order = require('../model/orders');


orderRouter.get('/allorders', async(req, res, next)=> {
    try {
       const allorders = await Order.find();
       res.json(allorders);
    } catch(err){
        res.send(err)
    }
});

orderRouter.get('/delivered', (req, res, next)=> {
    try {
        const deliverdorder = Order.find({ orderStatus: 1 });
        res.json(deliverdorder);
    } catch(err){
        res.send(err);
    }
} )
orderRouter.get('/cancel', async(req, res, next)=> {
    try {
        const deliverdorder = await Order.find({ orderStatus: 0 });
        res.json(deliverdorder);
    } catch(err){
        res.send(err);
    }
} )

orderRouter.get('/pickup', async(req, res, next)=> {
    try {
        const deliverdorder = await Order.find({ orderStatus: 2 });
        res.json(deliverdorder);
    } catch(err){
        res.send(err);
    }
} )

orderRouter.post('/neworder', (req, res, next)=> {
    const newOrder = new Order({
        orderId: req.body.orderId,
        itemName: req.body.itemName,
        price: req.body.price,
        quantity: req.body.quantity,
        deliveryAddress: req.body.deliveryAddress,
        deliveryPin: req.body.deliveryPin,
        orderStatus: req.body.orderStatus
    });
    newOrder.save();
    res.status(201).json({msg: 'new order success'})
});

module.exports = orderRouter;

