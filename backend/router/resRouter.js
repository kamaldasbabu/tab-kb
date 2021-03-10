const express = require('express');
const bcrypt= require('bcrypt');
const resRouter = express.Router();
const Res = require('../model/restaurant');
var jwt = require('jsonwebtoken');


resRouter.get('/allrestaurants', async (req, res, next)=> {
    try {
        const allrestaurant = await Res.find();
        res.json(allrestaurant);
    } catch(err){
        res.send('Error'+err);
    }
});

resRouter.post('/newres', async (req, res, next)=> {
    const newRestaurant = new Res({
        resId: req.body.resId,
        resName: req.body.resName,
        resAddress: req.body.resAddress,
        resPin: req.body.resPin,
        resRating: req.body.resRating
    });
    var restaurantZ = await newRestaurant.save((err, doc)=> {
        if(err){
            res.status(501).json({msg: 'order not placed Success'});
        } else {
            res.status(200).json({data: doc, msg:'Order Placed'})
        }
    });
    resRouter.get('/:resId', async(req, res, next)=> {
        const restaurantId = await Res.find(req.param.resId);
        res.json(restaurantId);
    })
    
    resRouter.delete('/deleteres/:id', async(req, res)=> {
        const restaurant = await Res.findOneAndDelete(req.param.id);
        if(!restaurant) {
            res.status(404).send("No Items");
        } else {
            res.status(200).send("deleted");
        } 
    })
   
});

module.exports = resRouter;