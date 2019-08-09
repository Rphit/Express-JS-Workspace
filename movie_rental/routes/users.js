const express = require('express');
const bcrypt =require('bcrypt');
const router = express.Router();
const mongoose = require('mongoose');

const {User, validate} = require ('../models/user');
const _=require('lodash'); //is adv version of underscore

router.get('/', async(req, res) => {
  const users = await User.find();
  res.send(users);
})

router.post('/', async(req, res) => {
  const {error} = validate(req.body);
   if(error) return res.status(400).send(error.details[o].message);

    let user= await User.findOne({ 'email':req.body.email});


    if(user) return res.status(400).send('user is already here');

    user  = new  User (_.pick(req.body, ['name','email','password']));
    const salt = await bcrypt.genSalt( 10);
    user.password=await bcrypt.hash(req.body.password,salt);
   // user = await user.save();
    //res.send( _.pick(user,['_id','name','email']));

    user = await user.save();
    //encription code
    const token =user.generateAuthToken();
    res.header( 'x-auth-token',token).send( _.pick(user, ['_id','name','email'] ));

});

module.exports = router;