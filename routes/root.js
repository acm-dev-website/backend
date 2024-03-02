const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');
const path = require('path');

const {secureCookie} = require('../secureCookie.js');

const {APIKey, ADMINPASS} = require('../Key.json');

const cookieCrypt = new secureCookie(APIKey);

const filePath = path.join(__dirname, '../views/');


router.get('/', async (req,res)=>{
  // Check and see if auth cookie exists
  return res.sendFile(filePath+'loginPage.html',{});
});

router.post('/', bodyParser.urlencoded({extended:true}), async (req,res)=>{
  // Check if password is correct
  console.log("login");
  if(req.body.password !== ADMINPASS) 
      return res.redirect('/');

  // Encrypt cookie
  const auth = cookieCrypt.encrypt((new Date()).toString());
  
  // Set cookie
  res.cookie('auth',auth,{httpOnly:true});

  return res.redirect('/admin');
});

router.get('/gbm', async (req,res)=>{
	// Check and see if auth cookie exists
	return res.sendFile(filePath+'gbm.html',{});
  });

module.exports = router;