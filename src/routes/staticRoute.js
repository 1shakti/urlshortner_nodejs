const express = require('express');
const router = express.Router();
const shortUrlModel = require('../models/url');

router.get('/', async (req, res) =>{
    if(!req.user) return res.redirect('/login');
    const allURLs = await shortUrlModel.find({createdBy:req.user._id}); 
    return res.render('home',{
        urls:allURLs
    });
})

router.get('/signup',(req, res) => {
    return res.render('Signup');
})

router.get('/login',(req, res) => {
    return res.render('Login');
})

module.exports = router;