const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const PORT = 3000;

app.use(bodyParser.urlencoded({extended: true}));

//this allows for connect to cluster 0 in our database and then read and write from it
//you might not be able to do it from home until I approve everyone to read and write
const dbURL = 'mongodb+srv://developer:<password>@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority';
mongoose.connect(dbURL);

//sending index.html to the web broswer
app.get('/',(req,res)=>{
    res.sendFile(__dirname+'/index.html');
})

//setting up port to listen on
//localhost:3000
app.listen(PORT, ()=>{
    console.log(`Server is listening on port ${PORT}`);
})