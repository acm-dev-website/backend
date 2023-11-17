// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {APIKey, PORT} = require("./Key.json");

app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

const eventSchema = {
  name: String,
  date: Date,
  description: String
}

const event = mongoose.model('events', eventSchema);

const dbURL = `mongodb+srv://developer:${APIKey}@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURL);

// Setting up html parsing and rendering
app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));

// Webpage redirects
// app.get('/',(req,res)=>{
//     res.sendFile(__dirname+"/login.html");
// })

// app.get('/admin',(req,res)=>{
//     res.render('admin',{});
// })

app.get('/', async (req, res) => {
  res.sendFile(__dirname+"/index.html");
})

// Using this to fetch all the data from
app.get("/raw/events", async (req, res) => {

  const events = await Event.find();
  res.json(events);
})


app.get('/admin/search',(req,res)=>{
    let request = req.query.eventSearch;

    if(!request || request===""){
        console.log("Not searching db");
    }else{
        console.log("Searching db");
    }

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

