const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {APIKey, PORT} = require("./Key.json");

app.use(bodyParser.urlencoded({extended:true}));

const dbURL = `mongodb+srv://developer:${APIKey}@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURL);;

app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/index.html");
})

app.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT);
    console.log(`http://localhost:${PORT}`)
})
