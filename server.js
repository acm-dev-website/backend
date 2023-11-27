const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

const cookieParser = require('cookie-parser')
const dotenv = require('dotenv');
dotenv.config();


app.set('view engine','ejs');
app.use(cookieParser());

app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const dbURL = `mongodb+srv://developer:${process.env.MONGOPASS}@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURL);

const rootRoute = require('./routes/root');
app.use('/', rootRoute);

const adminRoute = require('./routes/admin');
app.use('/admin', adminRoute);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT);
    console.log(`http://localhost:${PORT}`)
})