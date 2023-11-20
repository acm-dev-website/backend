// Imports
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const {APIKey, PORT} = require("./Key.json");

// Initilizing HTML parser
app.set('view engine','ejs');
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended:true}));

// Setting up schemas
const eventSchema = {
  name: String,
  date: Date,
  description: String
}
const Event = mongoose.model('events', eventSchema);

// Connecting to mongo
const dbURL = `mongodb+srv://developer:${APIKey}@cluster0.4ztfnxn.mongodb.net/?retryWrites=true&w=majority`;
mongoose.connect(dbURL);

//Webpage redirects
app.get('/admin',(req,res)=>{
  res.render('admin',{});
})

app.get('/', async (req,res)=>{
    res.sendFile(__dirname+"/login.html");
})

app.get("/raw/events/all", async (req, res) => {

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


// Running the server
app.listen(PORT, ()=>{
    console.log("Server listening on port "+PORT);
    console.log(`http://localhost:${PORT}`)
})

