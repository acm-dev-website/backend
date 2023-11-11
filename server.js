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

// Webpage redirects
app.get('/',(req,res)=>{
    res.sendFile(__dirname+"/login.html");
})

app.get('/admin',(req,res)=>{
    res.render('admin', {event: {name: ""}});
})


app.get('/admin/search', async (req, res) => {
    let searchText = req.query.eventSearch;
    console.log(`The search: ${searchText}`);

    // If user enters blank
    if(!searchText || searchText===""){
        res.send("error");
        return;
    }

    // If users searching string
    const events = await Event.find({ name: searchText });
    console.log(`Mongo found ${events}`);

    // If the event is not found
    if (events.length === 0) {
        emptyEvent = { name: "Event not found :(" };
        res.render("admin", { event: emptyEvent });
        return;
    }

    // If the event is found then it just renders
    
    res.render("admin", {event: events[0]});
})


// Post requests
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
