const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const {APIKey, PORT} = require("./Key.json");
const secureCookie = require('./secureCookie.js');

app.set('view engine','ejs');
app.use(cookieParser());

const dbURL = `mongodb+srv://developer:${APIKey}@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURL);
const cookieCrypt = new secureCookie(APIKey);
const loginPage = `
<!DOCTYPE html>
<html>
    <head>
        <title>Login</title>
    </head>
    <body>
        <form action="/" method="POST">
            <input type="password" name="password" placeholder="Password">
            <input type="submit" value="Login">
        </form>
    </body>
`
function cookieAuthCheck(req, res,next) {
    // Check and see if auth cookie exists
    if(!req.cookies.auth) return res.redirect('/');
    try {
        // Decrypt cookie
        const TSCookie = cookieCrypt.decrypt(req.cookies.auth);
        const TS = new Date(TSCookie);
        // check if the TSCookie is expired (24 hours)
        if(TS.getTime() + 1000*60*60*24 < new Date().getTime()) {
            // If expired, delete cookie and send login page
            res.clearCookie('auth');
            return res.redirect('/');
        }
        // Update cookie timestamp
        res.cookie('auth',cookieCrypt.encrypt((new Date()).toString()),{httpOnly:true});
        next();
    } catch(ex) {
        // If cookie is invalid, delete cookie and send login page
        res.clearCookie('auth');
        return res.redirect('/');
    }
}

app.get('/', async (req,res)=>{
    // Check and see if auth cookie exists
    if(!req.cookies.auth) return res.status(401).send(loginPage);
    try {
        // Decrypt cookie
        const TSCookie = cookieCrypt.decrypt(req.cookies.auth);
        const TS = new Date(TSCookie);
        // check if the TSCookie is expired (24 hours)
        if(TS.getTime() + 1000*60*60*24 < new Date().getTime()) {
            // If expired, delete cookie and send login page
            res.clearCookie('auth');
            return res.status(401).send(loginPage);
        }
        // Update cookie timestamp
        res.cookie('auth',cookieCrypt.encrypt((new Date()).toString()),{httpOnly:true});
        return res.sendFile(__dirname+"/index.html");
    } catch(ex) {
        // If cookie is invalid, delete cookie and send login page
        res.clearCookie('auth');
        return res.status(401).send(loginPage);
    }
})
app.post('/', bodyParser.urlencoded({extended:true}), async (req,res)=>{
    // Check if password is correct
    if(req.body.password !== "password") return res.status(401).send(loginPage);
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
    res.render('admin',{})
})

app.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT);
    console.log(`http://localhost:${PORT}`)
})
