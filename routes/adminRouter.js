const express = require("express");
const router = express.Router();
const { cookieAuthCheck } = require("../utils/secureCookie.js");
const { render, create, deleteEvent,login,loginRender } = require('../controllers/adminController.js');
const file_utils = require("../utils/file_utils.js");

console.log(__dirname);

router.use('/submit', file_utils.upload.single('image'));

//routes for admin route
router.get('/',  cookieAuthCheck,render);
router.get('/login',loginRender)
router.post('/login',login)
router.post('/submit',  cookieAuthCheck, create);
router.delete('/delete', cookieAuthCheck,deleteEvent);

module.exports = router;