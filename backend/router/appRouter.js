const express = require('express');
const bcrypt= require('bcrypt');
const router = express.Router();
const User = require('../model/user');
var jwt = require('jsonwebtoken');

router.get('/user', (req, res, next)=> {
    res.send('hi');
})

router.post('/add', async (req, res, next)=> {
    const addUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password
    });
    const z1 = await addUser.save((err,doc)=>{
        if(err){
            res.status(500).json({msg: err});
        }
        res.status(200).json({msg: doc});
    })


})

//---------------------------------
// using jwt 

router.post('/login', (req, res, next)=> {
    let promise = User.findOne({email:req.body.email}).exec();
    promise.then((doc)=> {
        if(doc){
             
            if(doc.password === (req.body.password)){
                // Generate token
                let token = jwt.sign({name: doc.name},'secret', {expiresIn: '3h'});
                return res.status(200).json({token: token, name: doc
                    .name}); 
            } else {
                return res.status(501).json({msg: 'password wrong'});
                
            }
        }else {
            return res.status(501).json({msg: ' Invalid Email'});
            
        }
    }).catch(err => {
        console.log(err);
    });
})


decodedToken = '';
var validateToken = (req, res, next)=> {
    let token = req.query.token;
    jwt.verify(token, 'secret', (err, tokenData)=> {
        if(err){
            return res.status(400).json({msg: 'unauthorize'});
        }
        if(tokenData) {
            this.decodedToken = tokenData;
            console.log('token veryfy success');
            next();
        }
    })

router.get('/username', validateToken, (req,res, next)=> {

    return res.status(200).json(decodedToken.name);
})



}


module.exports = router;