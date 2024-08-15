const express = require('express');
const router = express.Router();
const shortUrlModel = require('../models/url');
const { restrictTo } = require('../middlewares/auth');

router.get('/admin', restrictTo(['ADMIN']), async (req, res) =>{
    const allURLs = await shortUrlModel.find({}); 
    return res.render('home',{
        urls:allURLs
    });
})

router.get('/', restrictTo(['NORMAL','ADMIN']), async (req, res) =>{
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