const express = require("express");
const router = express.Router();
const { cookieAuthCheck } = require("../utils/secureCookie.js");
const { render, create, deleteEvent } = require('../controllers/adminController.js');
const bodyParser = require("body-parser");
const file_utils = require("../utils/file_utils.js");

router.use(['/','submit'], cookieAuthCheck);
router.use('/submit', file_utils.upload.single('image'));

router.get('/', render);
router.post('/submit', create);
router.delete('/delete', deleteEvent);

module.exports = router;