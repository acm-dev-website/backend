const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser');

const {APIKey,PORT} = require('./Key.json');

app.set('view engine','ejs');
app.use(cookieParser());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const dbURL = `mongodb+srv://developer:${APIKey}@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURL);

const rootRoute = require('./routes/root');
app.use('/', rootRoute);

const adminRoute = require('./routes/admin');
app.use('/admin', adminRoute);

app.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT);
    console.log(`http://localhost:${PORT}`)
})