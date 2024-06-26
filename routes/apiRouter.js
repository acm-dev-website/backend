const express = require("express");
const router = express.Router();
const { fetchEvent, fetchImage } = require('../controllers/apiController');
//routes to fetch
router.get('/fetch/events', fetchEvent);
router.get('/fetch/images/:img_name', fetchImage);

module.exports = router;