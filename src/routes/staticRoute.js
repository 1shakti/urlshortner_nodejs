const express = require('express');
const router = express.Router();
const shortUrlModel = require('../models/url');

router.get('/', async (req, res) =>{
    const allURLs = await shortUrlModel.find({}); 
    return res.render('home',{
        urls:allURLs
    });
})

module.exports = router;