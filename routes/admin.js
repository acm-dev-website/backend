const express = require("express");
const router = express.Router();
const mongo_utils = require('../utils/mongo_utils');
const path = require('path');

const Event = require("../models/event.js");
const {cookieAuthCheck} = require("../secureCookie.js");

router.use(express.static("public"));

const filePath = path.join(__dirname, '../views/');

router.get("/", cookieAuthCheck, (req, res)=>{
  res.sendFile(filePath+'admin.html',{});
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

 const Event = {
    name:name,
    date:date,
    description:desc
 };

// Send to DB
  try {
      const db = mongo_utils.get_client().db();
      const collection = db.collection('events');

      const result = await collection.insertOne(Event);
      console.log(result);
  }

  catch(err) {
    res.status(400).json({message: err.message});
  }

  res.redirect('/admin');
});

module.exports = router;