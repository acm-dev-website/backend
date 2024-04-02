const express = require("express");
const router = express.Router();
const { cookieAuthCheck } = require("../utils/secureCookie.js");
const { render, create, deleteEvent,login,loginRender } = require('../controllers/adminController.js');
const bodyParser = require("body-parser");
const file_utils = require("../utils/file_utils.js");

console.log(__dirname);
//router.use(express.static(__dirname+'../public'))

router.use('/submit', file_utils.upload.single('image'));

router.get('/', render);
router.post('/submit', create);
router.delete('/delete', deleteEvent);

module.exports = router;