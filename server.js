const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser')
const {APIKey, PORT} = require("./Key.json");
const secureCookie = require('./secureCookie.js');

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
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

app.get('/',async (req,res)=>{
    // Check and see if auth cookie exists
    if(!req.cookies.auth) return res.status(401).send(loginPage);
    // Decrypt cookie
    const auth = cookieCrypt.decrypt(req.cookies.auth);
    // Check if cookie is valid
    if(auth !== "session") return res.status(401).send(loginPage);
    return res.sendFile(__dirname+"/index.html");
})
app.post('/', async (req,res)=>{
    // Check if password is correct
    if(req.body.password !== "password") return res.status(401).send(loginPage);
    // Encrypt cookie
    const auth = cookieCrypt.encrypt("session");
    // Set cookie
    res.cookie('auth',auth,{httpOnly:true});
    return res.sendFile(__dirname+"/index.html");
})

app.get('/admin',(req,res)=>{
    res.render('admin',{})
})

app.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT);
    console.log(`http://localhost:${PORT}`)
})
