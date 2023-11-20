const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const secureCookie = require('./secureCookie.js');
const fs = require("fs");

/* Yeah sorry fam, I'm gonna be using env injector tool to manage the API keys, but I'll keep the .json for team members to use */
let {APIKey, PORT} = fs.existsSync("./Key.json") ? require("./Key.json") : {APIKey:process.env.MONGOPASS, PORT:process.env.PORT};

app.set('view engine','ejs');
app.use(cookieParser());
app.use(express.static("public"));

const event_schema = {
  name: String,
  date: Date,
  description: String
}

const event = mongoose.model('events', event_schema);

const dbURL = `mongodb+srv://developer:${APIKey}@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURL);
const cookieCrypt = new secureCookie(APIKey);

function cookieAuthCheck(req, res,next) {
    // Check and see if auth cookie exists
    if(!req.cookies.auth) return res.status(401).sendFile(__dirname+"/login.html");
    try {
        // Decrypt cookie
        const TSCookie = cookieCrypt.decrypt(req.cookies.auth);
        const TS = new Date(TSCookie);
        // check if the TSCookie is expired (24 hours)
        if(TS.getTime() + 1000*60*60 < new Date().getTime()) {
            // If expired, delete cookie and send login page
            res.clearCookie('auth');
            return res.status(401).sendFile(__dirname+"/login.html");
        }
        // Update cookie timestamp
        res.cookie('auth',cookieCrypt.encrypt((new Date()).toString()),{httpOnly:true});
        next();
    } catch(ex) {
        // If cookie is invalid, delete cookie and send login page
        res.clearCookie('auth');
        return res.status(401).sendFile(__dirname+"/login.html");
    }
}

app.get('/', cookieAuthCheck, async (req,res)=>{
    // Check and see if auth cookie exists
    return res.sendFile(__dirname+"/index.html");
})
app.post('/', bodyParser.urlencoded({extended:true}), async (req,res)=>{
    // Check if password is correct
    if(req.body.password !== "password") return res.status(401).sendFile(__dirname+"/login.html");
    // Encrypt cookie
    const auth = cookieCrypt.encrypt((new Date()).toString());
    // Set cookie
    res.cookie('auth',auth,{httpOnly:true});
    return res.sendFile(__dirname+"/index.html");
})
app.get('/authtest', cookieAuthCheck, (req,res)=>{
    return res.send("Auth Page Worked!!!!!!");
})

app.get('/admin',(req,res)=>{
    res.render('admin',{});
})

app.post('/admin/', async (req, res) => {
  const newEvent = new event({
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

app.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT);
    console.log(`http://localhost:${PORT}`)
})
