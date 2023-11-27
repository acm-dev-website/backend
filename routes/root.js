const express = require("express");
const router = express.Router();
const bodyParser = require('body-parser');

const {secureCookie} = require('../secureCookie.js');

const cookieCrypt = new secureCookie(process.env.MONGOPASS);

router.get('/', async (req,res)=>{
  // Check and see if auth cookie exists
  return res.render('loginPage',{});
});

router.post('/', bodyParser.urlencoded({extended:true}), async (req,res)=>{
  // Check if password is correct
  console.log("login");
  if(req.body.password !== process.env.ADMINPASS) 
      return res.redirect('/');

  // Encrypt cookie
  const auth = cookieCrypt.encrypt((new Date()).toString());
  
  // Set cookie
  res.cookie('auth',auth,{httpOnly:true});

  return res.redirect('/admin');
});



module.exports = router;