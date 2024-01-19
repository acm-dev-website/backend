const express = require("express");
const router = express.Router();

const Event = require("../models/event.js");
const {cookieAuthCheck} = require("../secureCookie.js");

router.use(express.static("public"));

router.get("/", cookieAuthCheck, (req, res)=>{
  res.sendFile('admin',{});
})

router.post('/', cookieAuthCheck, async (req, res) => {
  // Check to make sure all required fields have been filled out
  const name = req.body.name.trim();
  const date = req.body.date;
  const desc = req.body.description.trim();

  if (!req.body.name || !req.body.date || !req.body.description) {
    res.status(400).redirect("/admin");
    return;
  }

  // Create new event with field data
  const newEvent = new Event({
    name: name,
    date: date,
    description: desc
  });

// Send to DB
  try {
    const e = await newEvent.save();
  }

  catch(err) {
    res.status(400).json({message: err.message});
  }

  res.redirect('/admin');
});

module.exports = router;