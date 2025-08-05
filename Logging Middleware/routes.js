// routes/urlRoutes.js
const express = require('express');
const router = express.Router();
const { shortenUrl, redirectUrl } = require('../controllers/urlController');
const validateUrl = require('../middleware/validateUrl');

router.post('/shorten', validateUrl, shortenUrl);
router.get('/:shortId', redirectUrl);

module.exports = router;
