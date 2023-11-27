const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser')
const secureCookie = require('./secureCookie.js');
const fs = require("fs");
const dotenv = require('dotenv');
dotenv.config();
ddfab29298861e41180d61c122c40a9a3d4ee

app.set('view engine','ejs');
app.use(cookieParser());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));


const dbURL = `mongodb+srv://developer:${process.env.MONGOPASS}@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURL);
const cookieCrypt = new secureCookie(process.env.MONGOPASS);

const eventSchema = {
    name: String,
    date: Date,
    description: String
}
const Event = mongoose.model('events', eventSchema);


function cookieAuthCheck(req, res,next) {
    // Check and see if auth cookie exists
    if(!req.cookies.auth) 
        return res.status(401).redirect('/');
    
        try {
        // Decrypt cookie
        const TSCookie = cookieCrypt.decrypt(req.cookies.auth);
        const TS = new Date(TSCookie);

        // check if the TSCookie is expired (24 hours)
        if(TS.getTime() + 1000*60*60 < new Date().getTime()) {
            // If expired, delete cookie and send login page
            res.clearCookie('auth');
            return res.status(401).redirect('/');
        }
        // Update cookie timestamp
        res.cookie('auth',cookieCrypt.encrypt((new Date()).toString()),{httpOnly:true});
        next();
    } catch(ex) {
        // If cookie is invalid, delete cookie and send login page
        res.clearCookie('auth');
        return res.status(401).redirect('/');
    }
}

app.get('/', async (req,res)=>{
    // Check and see if auth cookie exists
    return res.render('loginPage',{});
})

app.post('/', bodyParser.urlencoded({extended:true}), async (req,res)=>{
    // Check if password is correct
    console.log(process.env.ADMINPASS);
    if(req.body.password !== process.env.ADMINPASS) 
        return res.redirect('/');

    // Encrypt cookie
    const auth = cookieCrypt.encrypt((new Date()).toString());
    
    // Set cookie
    res.cookie('auth',auth,{httpOnly:true});

    return res.redirect('/admin');
})

app.get('/admin', cookieAuthCheck, (req,res)=>{
    res.render('admin',{});
})

app.post('/admin/', cookieAuthCheck, async (req, res) => {
  const newEvent = new Event({
    name: req.body.name,
    date: req.body.date,
    description: req.body.description
  });
  try {
    const e = await newEvent.save();
  }
  catch(err) {
    res.status(400).json({message: err.message});
  }
  res.redirect('/admin');
});

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT);
    console.log(`http://localhost:${PORT}`)
})