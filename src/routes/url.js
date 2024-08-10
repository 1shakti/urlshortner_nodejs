const express = require('express');
const router = express.Router();
const { handleGenerateShortId, handleGetShortIdToRedirectURL, handleGetAnalyticsOfShortId } = require('../controllers/url');

router.post('/',  handleGenerateShortId)
router.get('/:shortId',  handleGetShortIdToRedirectURL)
router.get('/analytics/:shortId',  handleGetAnalyticsOfShortId)


module.exports = router;